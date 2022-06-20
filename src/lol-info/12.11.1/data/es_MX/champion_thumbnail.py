import json

with open("champion.json", "r", encoding="utf8") as championFile:
    data = json.load(championFile)

champions= data["data"]
new_json = {}

for champion in champions:
    new_json[champion] = {}
    new_json[champion]["name"] = champions[champion]["name"]
    new_json[champion]["image"] = champion + "_0.jpg"

with open("champion_thumbnail.json", "w") as outfile:
    json.dump(new_json, outfile)