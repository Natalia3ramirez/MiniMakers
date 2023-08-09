from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import alt_text
from datetime import datetime, timedelta
import random

def seed_pins():

  pin1 = Pin(
    user_id= 1,
    title= "Cute Octopus Sausage Bento",
    images= "https://i.pinimg.com/564x/1d/a8/2f/1da82fe0a64355296c43eb5701db1c1a.jpg",
    description= "Japanese bento with cute octopus shaped sausage, broccoli, grape, tomato, and rice, popular with children.",
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
    pin2 = Pin(
    user_id= 1,
    title= "Crafty Paper Plate Animals",
    images= "https://i.pinimg.com/564x/a3/99/d9/a399d977381503b439fd68eec9a27cd5.jpg",
    description= "Transform simple paper plates into adorable animal crafts with your kids.",
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  pin3 = Pin(
    user_id= 1,
    title= "DIY Rainbow Slime",
    images= "https://i.pinimg.com/564x/79/b4/8e/79b48e602758a8950dbb7c8e778e1cdf.jpg",
    description= "Create colorful and squishy slime with this easy DIY recipe. Six 6 oz bottles clear Elmer’s Glue (one bottle for each color) (or 4 ½ cups clear glue divided into 3/4 cup increments), 1/4 cup warm water for EACH color,1 tablespoon contact lens solution (containing boric acid), for EACH color, your choice of food coloring.",
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pin4 = Pin(
    user_id= 1,
    title= "Healthy Veggie Snacks",
    images= "https://i.pinimg.com/564x/c6/dc/c1/c6dcc1ada508ad4806e40f7fcf73aa55.jpg",
    description= "Make snack time fun and nutritious with these creative vegetable snacks.",
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  pin5 = Pin(
    user_id= 1,
    title= "Outdoor Nature Scavenger Hunt",
    images= "https://i.pinimg.com/736x/f8/1a/e5/f81ae5af38d3bcf983e4494830df1a7c.jpg",
    description= "Go on an adventure with your kids and explore nature through a scavenger hunt.",
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  pin6 = Pin(
    user_id= 1,
    title= "Rainbow Fruit Salad",
    images= "https://i.pinimg.com/564x/9b/f7/8c/9bf78cee1fc69511e83fb2130375ae4d.jpg",
    description= "Serve up a colorful and delicious fruit salad that kids will love.",
    created_at= datetime(year=2023, month=5, day=10, hour=9, minute=30, second=0)
  )
  pin7 = Pin(
    user_id= 1,
    title= "Indoor Obstacle Course",
    images= "https://i.pinimg.com/564x/fd/4b/55/fd4b55eb432de78a80db32cea3985e35.jpg",
    description= "Build a fun indoor obstacle course to keep kids active and entertained.",
    created_at= datetime(year=2023, month=4, day=5, hour=16, minute=15, second=0)
  )
  pin8 = Pin(
    user_id=  1,
    title= "DIY Fruit and Veggie Stamps",
    images= "https://i.pinimg.com/564x/6e/77/95/6e7795ff570e6f6f7a574274f9a43abe.jpg",
    description= "Create unique artwork using cut fruits and veggies as stamps for painting.",
    created_at= datetime(year=2023, month=2, day=18, hour=14, minute=30, second=0)
  )
  pin9 = Pin(
    user_id= 1,
    title= "Balloon Rocket Experiment",
    images= "https://i.pinimg.com/564x/89/f6/7d/89f67d76a1f4adf3e262fd8f75629a25.jpg",
    description= "Explore the science of motion with a fun balloon rocket experiment.",
    created_at= datetime(year=2023, month=1, day=5, hour=9, minute=15, second=0)
  )
  pin10 = Pin(
    user_id= 1,
    title= "Healthy Mini Pizzas",
    images= "https://i.pinimg.com/564x/6e/dd/3b/6edd3b89ca778deca2878c83260007c4.jpg",
    description= "Make mini pizzas with whole wheat crust and fresh toppings for a nutritious treat.",
    created_at= datetime(year=2022, month=12, day=22, hour=16, minute=0, second=0)
  )
  pin11 = Pin(
    user_id= 1,
    title= "DIY Playdough Creations",
    images= "https://i.pinimg.com/564x/3b/47/6b/3b476b8b5db3bd8560f6d70bd86a6b02.jpg",
    description= "Craft your own playdough and mold it into imaginative shapes and figures.",
    created_at= datetime(year=2022, month=11, day=10, hour=10, minute=30, second=0)
  )
  pin12 = Pin(
    user_id=1
    title="Artistic Salt Painting",
    images="https://i.pinimg.com/564x/07/03/9f/07039fd0208e630db026c600aa77ca06.jpg",
    description="Create beautiful watercolor-like paintings using salt and liquid watercolors.",
    created_at= datetime(year=2023, month=6, day=10, hour=9, minute=30, second=0)
  )
  pin13 = Pin(
    user_id=1
   title="Homemade Veggie Chips",
   images="https://i.pinimg.com/564x/7a/c4/f2/7ac4f2f35b15e32636758cddefb14c86.jpg",
   description="Bake crispy and flavorful veggie chips using a variety of colorful vegetables.",
    created_at= datetime(year=2023, month=7, day=28, hour=11, minute=45, second=0)
  )
  pin14 = Pin(
    user_id=1,
   title="Upcycled Cardboard Crafts",
   images="https://i.pinimg.com/564x/60/16/ae/6016aebc0519927fb9fa31a916cf0769.jpg",
   description="Turn cardboard boxes into imaginative crafts like cars, houses, and robots.",
    created_at= datetime(year=2023, month=8, day=15, hour=14, minute=0, second=0)
  )
  pin15 = Pin(
    user_id= 1,
    title= "Exploding Rainbow Volcano",
    images= "https://i.pinimg.com/564x/29/62/01/2962019b8f6250cf6e408b5bef8900b5.jpg",
    description= "Combine art and science with an erupting rainbow volcano experiment.",
    created_at= datetime(year=2023, month=5, day=20, hour=16, minute=15, second=0)
  )
  pin16 = Pin(
    user_id= 1,
    title= "Healthy Banana Oat Cookies",
    images= ,
    description= "These healthy and chewy Banana Oat cookies require only two ingredients - bananas and oats, plus your favorite add-ins! Perfect for breakfast on the go!",
    created_at= datetime(year=2023, month=4, day=5, hour=14, minute=30, second=0)
  )
  pin17 = Pin(
    user_id=  1,
    title= "Nature Bracelet Craft",
    images= "https://i.pinimg.com/564x/5f/1e/2d/5f1e2d99bd1859e374e3c824dce7567f.jpg",
    description= "Go on a nature walk and create beautiful bracelets using collected natural treasures.",
    created_at= datetime(year=2023, month=3, day=18, hour=10, minute=0, second=0)
  )
  pin18 = Pin(
    user_id= 1,
    title= "DIY Story Stones",
    images= "https://i.pinimg.com/564x/33/f5/70/33f570dc21ad5bbe8fdefd704935f805.jpg",
    description= "Craft story stones with images to spark creativity and storytelling with kids.",
    created_at= datetime(year=2023, month=2, day=10, hour=11, minute=15, second=0)
  )
  pin19 = Pin(
    user_id= 1,
    title= "Rainbow Rice Sensory Play",
    images= "https://i.pinimg.com/564x/7b/1d/a4/7b1da4891a018b15c872397867233aee.jpg",
    description= "Create a colorful sensory play activity with dyed rice and fun scoops.",
    created_at= datetime(year=2023, month=1, day=5, hour=9, minute=30, second=0)
  )
  pin20 = Pin(
    user_id= 1,
    title= "Bubble Wrap Stomp Painting",
    images= "https://i.pinimg.com/564x/70/16/b7/7016b7833bd9273f03743e966de61075.jpg",
    description= "Combine art and movement by stomping on bubble wrap covered in paint.",
    created_at= datetime(year=2022, month=11, day=10, hour=14, minute=45, second=0)
  )
  # pin21 = Pin(
  #   user_id= 2,
  #   title= "Indoor Balloon Tennis",
  #   images= ,
  #   description= "Set up a fun and active indoor balloon tennis game for kids.",
  #   created_at= datetime(year=2022, month=10, day=5, hour=12, minute=0, second=0)
  # )
  # pin22 = Pin(
  #   user_id= 2,
  #   title= "Colorful Fruit Popsicles",
  #   images= ,
  #   description= "Make refreshing and healthy fruit popsicles in a variety of vibrant colors.",
  #   created_at= datetime(year=2022, month=9, day=18, hour=9, minute=30, second=0)
  # )
  # pin23 = Pin(
  #   user_id= 2,
  #   title= "DIY Paper Plate Masks",
  #   images= ,
  #   description= "Create imaginative paper plate masks with kids for dress-up and play.",
  #   created_at= datetime(year=2022, month=8, day=10, hour=14, minute=15, second=0)
  # )
  # pin24 = Pin(
  #   user_id= 2,
  #   title= "Rainbow Water Blob",
  #   images= ,
  #   description= "Build a colorful and squishy water blob for sensory play on a hot day.",
  #   created_at= datetime(year=2022, month=7, day=22, hour=11, minute=0, second=0)
  # )
  # pin25 = Pin(
  #   user_id= 2,
  #   title= "Nature Scavenger Hunt",
  #   images= ,
  #   description= "Go outdoors and explore with a nature scavenger hunt, finding various items.",
  #   created_at= datetime(year=2022, month=6, day=15, hour=13, minute=30, second=0)
  # )
  # pin26 = Pin(
  #   user_id= 3,
  #   title= "Homemade Playdough",
  #   images= ,
  #   description= "Mix up your own playdough in a rainbow of colors for creative playtime.",
  #   created_at= datetime(year=2022, month=5, day=8, hour=10, minute=45, second=0)
  # )
  # pin27 = Pin(
  #   user_id= 3,
  #   title= "Glowing Jar Fireflies",
  #   images= ,
  #   description= "Craft glowing fireflies in a jar with glow sticks for a magical nighttime effect.",
  #   created_at= datetime(year=2022, month=4, day=30, hour=20, minute=0, second=0)
  # )
  # pin28 = Pin(
  #   user_id= 3,
  #   title= "Creative Collage Art",
  #   images= ,
  #   description= "Encourage creativity by making unique collage art with various materials.",
  #   created_at= datetime(year=2022, month=3, day=12, hour=15, minute=15, second=0)
  # )
  # pin29 = Pin(
  #   user_id= 3,
  #   title= "Outdoor Chalk Obstacle Course",
  #   images= ,
  #   description= "Design an exciting outdoor obstacle course with chalk and creative challenges.",
  #   created_at= datetime(year=2022, month=2, day=5, hour=9, minute=0, second=0)
  # )
  # pin30 = Pin(
  #   user_id= 3,
  #   title= "Edible Marshmallow Playdough",
  #   images= ,
  #   description= "Make edible playdough using marshmallows and a few simple ingredients.",
  #   created_at= datetime(year=2022, month=1, day=20, hour=12, minute=30, second=0)
  # )

  pin_item_list = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10,
pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20]

  pins_list = [db.session.add(pin_item) for pin_item in pin_item_list]
  db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()


