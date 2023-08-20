from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

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
    description= "Create colorful and squishy slime with this easy DIY recipe.",
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
    user_id=1,
    title="Artistic Salt Painting",
    images="https://i.pinimg.com/564x/07/03/9f/07039fd0208e630db026c600aa77ca06.jpg",
    description="Create beautiful watercolor-like paintings using salt and liquid watercolors.",
    created_at= datetime(year=2023, month=6, day=10, hour=9, minute=30, second=0)
  )
  pin13 = Pin(
   user_id=1,
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
    images= "https://i.pinimg.com/564x/5f/1e/2d/5f1e2d99bd1859e374e3c824dce7567f.jpg",
    description= "These healthy and chewy Banana Oat cookies require only two ingredients - bananas and oats, plus your favorite add-ins! Perfect for breakfast on the go!",
    created_at= datetime(year=2023, month=4, day=5, hour=14, minute=30, second=0)
  )
  pin17 = Pin(
    user_id=  1,
    title= "Nature Bracelet Craft",
    images= "https://i.pinimg.com/564x/c6/9d/22/c69d22ecc4e30678610570f75930c09c.jpg",
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
  pin21 = Pin(
    user_id= 2,
    title= "Indoor Balloon Tennis",
    images= "https://i.pinimg.com/236x/34/10/27/34102773644101096748aa31de4f4931.jpg" ,
    description= "Set up a fun and active indoor balloon tennis game for kids.",
    created_at= datetime(year=2022, month=10, day=5, hour=12, minute=0, second=0)
  )
  pin22 = Pin(
    user_id= 2,
    title= "Colorful Fruit Popsicles",
    images="https://i.pinimg.com/236x/92/91/ad/9291ad6793fa01e783589cdef1c20391.jpg" ,
    description= "Make refreshing and healthy fruit popsicles in a variety of vibrant colors.",
    created_at= datetime(year=2022, month=9, day=18, hour=9, minute=30, second=0)
  )
  pin23 = Pin(
    user_id= 2,
    title= "DIY Paper Plate Masks",
    images= "https://i.pinimg.com/236x/0a/bc/78/0abc78e5c77d63b70e112b322b69f296.jpg",
    description= "Create imaginative paper plate masks with kids for dress-up and play.",
    created_at= datetime(year=2022, month=8, day=10, hour=14, minute=15, second=0)
  )
  pin24 = Pin(
    user_id=2,
    title="Edible Rainbow Necklace",
    images="https://i.pinimg.com/236x/ae/6a/02/ae6a02aa314909d362ce67d6f5a1fcf6.jpg",
    description="Engage kids in making and wearing their own edible rainbow necklaces using fruit loops.",
    created_at=datetime(year=2022, month=4, day=8, hour=9, minute=0, second=0)
  )

  pin25 = Pin(
    user_id=2,
    title="DIY Cardboard Marble Run",
    images="https://i.pinimg.com/564x/73/ae/15/73ae15ab18bcdc10f7bf8b3590aeaabd.jpg",
    description="Build a creative and customizable marble run using cardboard and tubes.",
    created_at=datetime(year=2022, month=3, day=25, hour=15, minute=15, second=0)
  )

  pin26 = Pin(
    user_id=3,
    title="Water Balloon Painting",
    images="https://i.pinimg.com/564x/e4/89/ec/e489ec360a3ea66b5b8125fb5f4b54be.jpg",
    description="Combine water balloons and paint to create unique and colorful artworks.",
    created_at=datetime(year=2022, month=2, day=12, hour=12, minute=30, second=0)
  )
  pin27 = Pin(
    user_id= 3,
    title= "Glowing Jar Fireflies",
    images="https://i.pinimg.com/236x/7c/9e/e0/7c9ee0f4d2e86478332b23924a869950.jpg",
    description= "Craft glowing fireflies in a jar with glow sticks for a magical nighttime effect.",
    created_at= datetime(year=2022, month=4, day=30, hour=20, minute=0, second=0)
  )
  pin28 = Pin(
    user_id= 3,
    title= "Creative Collage Art",
    images="https://i.pinimg.com/736x/2f/07/14/2f07143ef9727d1aad98c8e4ca82b7cb.jpg",
    description= "Encourage creativity by making unique collage art with various materials.",
    created_at= datetime(year=2022, month=3, day=12, hour=15, minute=15, second=0)
  )
  pin29 = Pin(
    user_id= 3,
    title= "Outdoor Chalk Obstacle Course",
    images="https://i.pinimg.com/236x/71/9e/07/719e07265ec34a7f82e908406167b855.jpg",
    description= "Design an exciting outdoor obstacle course with chalk and creative challenges.",
    created_at= datetime(year=2022, month=2, day=5, hour=9, minute=0, second=0)
  )
  # pin30 = Pin(
  #   user_id=4,
  #   title="Dinosaur Ice Excavation Sensory Play",
  #   images="https://i.pinimg.com/564x/12/aa/7c/12aa7cc651ab033fba44d1d5a582e371.jpg",
  #   description="Freeze toys in ice and let kids excavate them using tools for a cool sensory experience.",
  #   created_at=datetime(year=2021, month=11, day=18, hour=10, minute=0, second=0)
  # )

  # pin31 = Pin(
  #   user_id=4,
  #   title="Sensory Bottles for Babies",
  #   images="https://i.pinimg.com/564x/bd/19/a8/bd19a8b3f75fade07ee299dbcae79ce4.jpg",
  #   description="Create sensory bottles filled with various materials to engage and stimulate babies.",
  #   created_at=datetime(year=2021, month=12, day=22, hour=14, minute=45, second=0)
  # )

  # pin32 = Pin(
  #   user_id=1,
  #   title="Glow in the Dark Painting",
  #   images="https://i.pinimg.com/564x/87/21/07/872107237bbd4f7746b77de473bda4e6.jpg",
  #   description="Create stunning glow in the dark paintings with neon colors and black lights.",
  #   created_at=datetime(year=2022, month=5, day=20, hour=13, minute=45, second=0)
  # )


  # pin36 = Pin(
  #   user_id=3,
  #   title="Outdoor Nature Art",
  #   images="",
  #   description="Use leaves, sticks, and other natural elements to make beautiful outdoor nature art.",
  #   created_at=datetime(year=2022, month=1, day=3, hour=9, minute=0, second=0)
  # )




  pin_item_list = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10,
pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23, pin24, pin25, pin26, pin27, pin28, pin29]

  pins_list = [db.session.add(pin_item) for pin_item in pin_item_list]
  db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()


