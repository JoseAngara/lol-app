from PIL import Image
import os

entries = os.listdir('380px')

images = []
for entrie in entries:
  image = Image.open('380px/' + entrie)
  new_image = image.resize((300, 300))
  new_image.save(entrie)

