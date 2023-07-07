#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Route, UserRoute, Review, Mountain

if __name__ == '__main__':
#     fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        
# User.query.delete()
# Route.query.delete()
# UserRoute.query.delete()
# Review.query.delete()
# Mountain.query.delete()

#create some users
u1 = User(profile_picture ='https://images.fineartamerica.com/images-medium-large-5/mount-elbert-brian-kerls.jpg', first_name='Ashley', last_name='Burnett', user_name='Ashley_of_the_Mountains', age='41', current_zip_code='80909', favorite_mountain='Mt. Elbert', email='ashleyburnett081@gmail.com', password='Austerlitz1805@')
u2 = User(profile_picture ='https://images.fineartamerica.com/images-medium-large-5/mount-elbert-brian-kerls.jpg', first_name='Dalton', last_name='Burnett', user_name='Dalton1981', age='41', current_zip_code='80909', favorite_mountain='Mt. Elbert', email='dltnbrntt@gmail.com', password='Blenheim1704@')
u3 = User(profile_picture ='https://images.fineartamerica.com/images-medium-large-5/mount-elbert-brian-kerls.jpg', first_name='Edmund', last_name='Hillary', user_name='Everest#1', age='99', current_zip_code='80909', favorite_mountain='Mt. Everest', email='fake1@fake.com', password='Blenheim1704@')
u4 = User(profile_picture ='https://images.fineartamerica.com/images-medium-large-5/mount-elbert-brian-kerls.jpg', first_name='Edward', last_name='Viesters', user_name='14-8000ers', age='63', current_zip_code='80909', favorite_mountain='Kangchenjunga', email='fake2@fake.com', password='Blenheim1704@')

users = [u1, u2, u3, u4]
db.session.add_all(users)
db.session.commit()