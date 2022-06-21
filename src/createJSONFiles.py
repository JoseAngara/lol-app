import json
import numpy as np
import itertools

current_version = "12.11.1"
lol_data_path = './lol-info/{version}/data'.format(version=current_version)
language = "es_MX"

with open('{data_path}/{language}/{file_name}'.format(data_path=lol_data_path, language=language, file_name="champion.json")
, "r", encoding="utf8") as json_doc:
    data=json.load(json_doc)
champion_data = data["data"]
champion_data_keys = list(champion_data.keys())

#create champion_stats.json
def calculateStats(champion, stat, lvl):
    statistics = champion_data[champion]["stats"]
    return round(statistics[stat] + statistics[stat + "perlevel"] * (lvl - 1), 2)

def calculateEffectiveHealth(healt_array, resist_array):
    stats = []
    for (health, resist) in zip(healt_array, resist_array):
        stats.append(round((1 + resist / 100) * health, 2))

    return stats

levels = np.linspace(1, 18, 18)

stats = ["hp", "armor", "spellblock", "hpregen", "mpregen", "attackdamage", "attackspeed"]

champion_stats = []

for champion in champion_data_keys:
    champion_statistics = {}
    champion_statistics["name"] = champion_data[champion]["name"]
    champion_statistics["key"] = champion_data[champion]["key"]
    champion_statistics["stats"] = champion_data[champion]["stats"]
    champion_statistics["scalatingstats"] = {}

    for stat in stats:
        champion_statistics["scalatingstats"][stat] = [calculateStats(champion, stat, lvl) for lvl in levels]

    champion_statistics["scalatingstats"]["effectivehparmor"] = calculateEffectiveHealth(champion_statistics["scalatingstats"]["hp"], champion_statistics["scalatingstats"]["armor"])
    champion_statistics["scalatingstats"]["effectivehpmp"] = calculateEffectiveHealth(champion_statistics["scalatingstats"]["hp"], champion_statistics["scalatingstats"]["spellblock"])

    champion_stats.append(champion_statistics)

with open('{data_path}/{file_name}'.format(data_path=lol_data_path, file_name="champion_stats.json"), "w") as outfile:
    json.dump(champion_stats, outfile)

#create champion_thumbnails.json
champion_thumbnails = []

for champion in champion_data_keys:
    champion_info = {}
    champion_info["name"] = champion_data[champion]["name"]
    champion_info["image"] = champion + "_0.jpg"
    champion_info["key"] = champion_data[champion]["key"]

    champion_thumbnails.append(champion_info)

with open('{data_path}/{file_name}'.format(data_path=lol_data_path, file_name="champion_thumbnails.json")
, "w") as outfile:
    json.dump(champion_thumbnails, outfile)