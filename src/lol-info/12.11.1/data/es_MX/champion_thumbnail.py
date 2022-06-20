import json

with open("src/lol-info/12.11.1/data/es_MX/champion.json", "r", encoding="utf8") as championFile:
    data = json.load(championFile)

champions= data["data"]
new_json = {}

for champion in champions:
    new_json[champion] = {}
    new_json[champion]["name"] = champions[champion]["name"]
    new_json[champion]["image"] = champion + "_0.jpg"
    new_json[champion]["key"] = champions[champion]["key"]

with open("src/lol-info/12.11.1/data/es_MX/champion_thumbnails.json", "w") as outfile:
    json.dump(new_json, outfile)