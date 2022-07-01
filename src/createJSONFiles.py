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
    if stat == "attackspeed":
        return round(statistics[stat] * (1 + statistics[stat + "perlevel"] / 100) ** (lvl - 1), 3)
    return round(statistics[stat] + statistics[stat + "perlevel"] * (lvl - 1), 2)

def calculateEffectiveHealth(healt_array, resist_array):
    stats = []
    for (health, resist) in zip(healt_array, resist_array):
        stats.append(round((1 + resist / 100) * health, 2))

    return stats

levels = np.linspace(1, 18, 18)

stats = ["hp", "mp", "armor", "spellblock", "hpregen", "mpregen", "attackdamage", "attackspeed"]

champion_stats = []
counter = 1

for champion in champion_data_keys:
    champion_statistics = {}
    champion_statistics["name"] = champion_data[champion]["name"]
    champion_statistics["key"] = champion_data[champion]["key"]
    champion_statistics["colorhue"] = int(counter * (360 / len(champion_data_keys)))
    champion_statistics["stats"] = champion_data[champion]["stats"]
    champion_statistics["scalatingstats"] = {}
    counter += 1

    for stat in stats:
        champion_statistics["scalatingstats"][stat] = [calculateStats(champion, stat, lvl) for lvl in levels]

    champion_statistics["scalatingstats"]["effectivehparmor"] = calculateEffectiveHealth(champion_statistics["scalatingstats"]["hp"], champion_statistics["scalatingstats"]["armor"])
    champion_statistics["scalatingstats"]["effectivehpspellblock"] = calculateEffectiveHealth(champion_statistics["scalatingstats"]["hp"], champion_statistics["scalatingstats"]["spellblock"])

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

#create champion_lane.json
champion_ids = []
for champion in champion_data:
    champion_info ={}
    champion_info["name"] = champion_data[champion]["name"]
    champion_info["key"] = champion_data[champion]["key"]
    champion_ids.append(champion_info)

def getId(champion_name):
    champion = [champ for champ in champion_ids if champ.get("name") == champion_name][0]
    return champion["key"]

top_champs = ['Darius', 'Mordekaiser', 'Fiora', 'Irelia', 'Gangplank', 'Olaf', 'Wukong', 'Nasus', 'Kayle', 'Jax', 'Akali', 'Volibear', 'Sett', 'Yone', 'Illaoi', 'Malphite', 'Tryndamere', 'Camille', 'Aatrox', 'Yasuo', 'Yorick', 'Garen', 'Vayne', 'Tahm Kench', 'Gwen', 'Dr. Mundo', 'Gnar', 'Teemo', 'Riven', 'Vladimir', 'Akshan', 'Urgot', 'Renekton', 'Lillia', 'Swain', 'Graves', 'Kled', 'Ornn', 'Shen', "Cho'Gath", 'Sylas', 'Trundle', 'Singed', 'Sion', 'Poppy', 'Jayce', 'Rengar', 'Quinn', 'Warwick', 'Pantheon', 'Shyvana', 'Kennen', 'Gragas', 'Rumble']

jungle_champs = ['Amumu', "Bel'Veth", 'Diana', 'Ekko', 'Elise', 'Evelynn', 'Fiddlesticks', 'Gragas', 'Graves', 'Hecarim', 'Ivern', 'Jarvan IV', 'Jax', 'Karthus', 'Kayn', "Kha'Zix", 'Kindred', 'Lee Sin', 'Lillia', 'Maestro Yi', 'Mordekaiser', 'Nidalee', 'Nocturne', 'Nunu y Willump', 'Olaf', 'Poppy', 'Qiyana', 'Rammus', "Rek'Sai", 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Taliyah', 'Talon', 'Trundle', 'Udyr', 'Vi', 'Viego', 'Volibear', 'Warwick', 'Wukong', 'Xin Zhao', 'Zac', 'Zed']

mid_champs = ['Zed', 'Yasuo', 'Akali', 'Yone', 'Irelia', 'Veigar', 'Ahri', 'Vladimir', 'Malzahar', 'Sylas', 'Katarina', 'Akshan', 'Vex', 'Fizz', 'Viktor', 'Anivia', 'Taliyah', 'Diana', 'Gangplank', 'Kassadin', 'Swain', 'Mordekaiser', 'LeBlanc', 'Lissandra', 'Lux', 'Ekko', 'Zeri', 'Kayle', 'Cassiopeia', 'Brand', 'Qiyana', 'Xerath', 'Malphite', 'Zoe', 'Sett', 'Annie', 'Tristana', 'Pantheon', 'Syndra', 'Singed', 'Talon', 'Corki', 'Zilean', 'Galio', "Cho'Gath", "Vel'Koz", 'Azir', 'Seraphine', 'Neeko', 'Twisted Fate', 'Aurelion Sol', 'Karma', 'Rumble', 'Jayce', 'Kennen', 'Ryze', 'Orianna', 'Ziggs', 'Gragas']

bottom_champs = ['Vayne', 'Samira', 'Zeri', 'Lucian', 'Jhin', 'Draven', 'Caitlyn', 'Twitch', "Kog'Maw", 'Ezreal', 'Tristana', "Kai'Sa", 'Miss Fortune', 'Ashe', 'Jinx', 'Veigar', 'Aphelios', 'Xayah', 'Kalista', 'Sivir', 'Varus', 'Ziggs', 'Seraphine']

support_champs = ['Morgana', 'Pyke', 'Lulu', 'Yuumi', 'Senna', 'Nautilus', 'Blitzcrank', 'Renata Glasc', 'Leona', 'Nami', 'Brand', 'Soraka', 'Swain', 'Lux', 'Zyra', 'Zilean', 'Janna', 'Karma', 'Thresh', 'Xerath', 'Shaco', 'Ashe', 'Seraphine', 'Alistar', 'Tahm Kench', 'Pantheon', "Vel'Koz", 'Braum', 'Taric', 'Rakan', 'Rell', 'Bardo', 'Sona', 'Maokai']

top_champs_id = [getId(champion_name) for champion_name in top_champs]
top_champs_id.sort(key=lambda value: int(value))
jungle_champs_id = [getId(champion_name) for champion_name in jungle_champs]
jungle_champs_id.sort(key=lambda value: int(value))
mid_champs_id = [getId(champion_name) for champion_name in mid_champs]
mid_champs_id.sort(key=lambda value: int(value))
bottom_champs_id = [getId(champion_name) for champion_name in bottom_champs]
bottom_champs_id.sort(key=lambda value: int(value))
support_champs_id = [getId(champion_name) for champion_name in support_champs]
support_champs_id.sort(key=lambda value: int(value))

champion_lane = {
    "top": top_champs_id,
    "jungle": jungle_champs_id,
    "mid": mid_champs_id,
    "bottom": bottom_champs_id,
    "support": support_champs_id
}

with open('{data_path}/{file_name}'.format(data_path=lol_data_path, file_name="champion_lane.json")
, "w") as outfile:
    json.dump(champion_lane, outfile)

#create champion_role.json
champion_role = []

for champion in champion_data_keys:
    champion_info = {}
    champion_info["name"] = champion_data[champion]["name"]
    champion_info["role"] = champion_data[champion]["tags"]
    champion_info["key"] = champion_data[champion]["key"]
    champion_role.append(champion_info)

with open('{data_path}/{file_name}'.format(data_path=lol_data_path, file_name="champion_role.json")
, "w") as outfile:
    json.dump(champion_role, outfile)