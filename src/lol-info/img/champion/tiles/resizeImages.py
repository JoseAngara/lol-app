import os
from PIL import Image
"""
files = os.listdir('380px')
for file in files:
  image = Image.open('380px/' + file)
  newImage = image.resize((100, 100))
  newImage.save('70px/' + file)
"""

image = Image.open('380px/FiddleSticks_0.jpg')
newImage = image.resize((100, 100))
newImage.save('70px/Fiddlesticks_0.jpg')