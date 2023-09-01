from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='Lition',
        about_me='Hey there, I am Demo, a parent on a mission to fill childhood with joy and imagination. We will explore interactive ways to nurture skills, from early literacy to problem-solving, all while having a blast!',
        email='demo@aa.io',
        password='password',
        birthdate=date(1992, 1, 1),
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGQQPJTeRXYxfbXVhLLXPl4aCJCexZ4dS7Q&usqp=CAU')
    sophia = User(
        first_name='Sophia',
        last_name='Smith',
        about_me= "Just a parent looking for parent tips and tricks.",
        email='sophia@aa.io',
        password='password',
        birthdate=date(1992, 1, 2),
        image='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60')
    liam = User(
        first_name='Liam',
        last_name='Williams',
        about_me= "Creating fun activities to entertain kids of all ages!",
        email='liam@aa.io',
        password='password',
        birthdate=date(1992, 1, 3),
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRifV3RIprnL4_-ZPwLX8Q8pnrgM7NtJ8jmoYoJAEoRGSusms7qritvgIL2QYSKOHdHeFQ&usqp=CAU')

    db.session.add(demo)
    db.session.add(sophia)
    db.session.add(liam)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
