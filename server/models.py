from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
import re
from sqlalchemy.orm import validates




class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    user_name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    current_zip_code = db.Column(db.Integer, nullable=False)
    favorite_mountain = db.Column(db.String, nullable=False)
    email= db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #Relationships
    user_routes = db.relationship('UserRoute', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
    routes = association_proxy('user_routes', 'route')
    #Serialize
    
    serialize_only = ('id', 'profile_picture', 'first_name', 'last_name', 'user_name', 'age', 'current_zip_code', 'favorite_mountain', 'email', 'created_at', 'updated_at', 'reviews', 'user_routes', 'routes.picture')
    serialize_rules = ('-user_routes.user', '-user_routes.route')
    
    #Validations
    @validates('profile_picture')
    def validate_profile_picture(self, key, pic):
        if not pic:
          raise ValueError('You must upload a profile picture')
        return pic
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name or not type(str) or not 1 < len(first_name) <50:
          raise ValueError('Your first name must be between 2 and 50 characters long')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name or not type(str) or not 2 < len(last_name) < 30:
          raise ValueError('Your last name must be between 2 and 30 characters long')
        return last_name

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name or not type(str) or not 2 < len(user_name) < 35:
          raise ValueError('Your user name must be between 2 and 35 characters long')
        return user_name

    @validates('age')
    def validate_age(self, key, new_age):
        if not new_age or not 16 <= int(new_age) <= 101:
          raise ValueError(' Your age must be between 16 and 100 years old to join')
        return new_age

    @validates('current_zip_code')
    def validate_zip_code(self, key, my_zip_code):
        if not my_zip_code or not type(int) or not len(str(my_zip_code)) == 5:
            raise ValueError('You must enter a valid zip code to join')
        return my_zip_code
    
    @validates('favorite_mountain')
    def validate_favorite_mountain(self, key, mountain):
        if not mountain or not 2 < len(mountain) < 35:
          raise ValueError(' Your favorite mountain must be between 2 and 35 characters long')
        return mountain

    
    @validates('email')
    def emailValid(self, key, current_email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if not re.fullmatch(regex, current_email_address):
            raise ValueError("Invalid email address")
        if User.query.filter_by(email= current_email_address).first():
            raise ValueError('Email already in use')
        return current_email_address
    
    @validates('password')
    def password_valid(self, key, current_password):
        regex = re.compile(r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z0-9\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]{8,60}$')
        if re.fullmatch(regex, current_password):
            return current_password        
        return ValueError("Invalid password")    
    
class Route(db.Model, SerializerMixin):
    __tablename__ = 'routes'
    
    id = db.Column(db.Integer, primary_key=True)
    mountain_id = db.Column(db.Integer, db.ForeignKey('mountains.id'))
    name = db.Column(db.String, nullable=False)
    picture = db.Column(db.String, nullable=False)
    difficulty_class = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    elevation_gain = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #Relationships
    user_routes = db.relationship('UserRoute', back_populates='route')
    reviews =db.relationship('Review', back_populates ='route')
    # mountains = db.relationship('Mountain', back_populates='routes')
    users = association_proxy('user_routes', 'user')
    
    #Serialize
    serialize_only = ('id', 'mountain_id', 'name', 'difficulty_class', 'length', 'elevation_gain', 'created_at', 'updated_at', 'picture')
    serialize_rules = ('-user_routes', '-reviews', '-mountains')
    
    #Validations
    @validates('name')
    def validate_name(self, key, name):
        if not name or not type(str) or not 1 < len(name) <75:
          raise ValueError('The route name must be between 2 and 50 characters long')
        return name   
    
    @validates('picture')
    def validate_picture(self, key, pic):
        if not pic:
          raise ValueError('You must upload a picture')
        return pic        
    
    @validates('difficulty_class')
    def validate_difficulty_class(self, key, difficulty_class):
        if not difficulty_class or not type(int) or not range(1,6):
          raise ValueError('Must be between class 1 and class 5')
        return difficulty_class
    
    @validates('length')
    def validate_length(self, key, length):
        if not length or not type(int) or not range(1, 151):
          raise ValueError('The route length must be between 1 and 150 miles')
        return length
    
    @validates('elevation_gain')
    def validate_elevation_gain(self, key, elevation_gain):
        if not elevation_gain or not type(int) or not range(1, 15001):
          raise ValueError('Elevation gain must be between 1 and 15,000 feet.')
        return elevation_gain



class Mountain(db.Model, SerializerMixin):
    __tablename__ = 'mountains'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    picture = db.Column(db.String, nullable=False)
    elevation = db.Column(db.Integer, nullable=False)
    number_of_routes = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String, nullable=False)
    emergency_contact_information = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #Relationships
    # routes = db.relationship('Route', back_populates='mountains')
    #Serialize
    serialize_only = ('id', 'name', 'elevation', 'number_of_routes', 'location', 'emergency_contact_information', 'created_at', 'updated_at', 'picture')
    # serialize_rules = ('-routes')
    
    #Validations
    @validates('name')
    def validate_name(self, key, name):
        if not name or not type(str) or not 2 < len(name) <75:
          raise ValueError('The Mountain name must be between 2 and 50 characters long')
        return name   
    
    @validates('picture')
    def validate_picture(self, key, pic):
        if not pic:
          raise ValueError('You must upload a picture')
        return pic        
    
    @validates('elevation')
    def validate_elevation(self, key, height):
        if not height:
          raise ValueError(' Your must enter the mountains elevation')
        return height
    
    @validates('number_of_routes')
    def validate_number_of_routes(self, key, number):
        if not number or not type(int) or not 1< len(number) <151:
          raise ValueError(' Your must enter the number of routes found on the mountain')
        return number
    
    @validates('location')
    def validate_location(self, key, the_place):
        if not the_place or not type(str) or not 2 < len(the_place) < 100:
          raise ValueError('The location must be between 2 and 100 characters long')
        return the_place
    
    @validates('emergency_contact_information')
    def validate_emergency_contact_information(self, key, contact):
        if not contact or not type(str) or not 2 < len(contact) < 200:
          raise ValueError('The contact information must be between 2 and 200 characters long')
        return contact


class UserRoute(db.Model, SerializerMixin):
    __tablename__ = 'user_routes'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Integer, nullable=False)
    duration_of_climb =db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    route_id =db.Column(db.Integer, db.ForeignKey('routes.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #Relationships
    user = db.relationship('User', back_populates='user_routes')
    route = db.relationship('Route', back_populates='user_routes')
    
    #Serialize
    serialize_only = ('id', 'date', 'duration_of_climb', 'comment', 'user_id', 'route_id', 'created_at', 'updated_at', 'route.picture')
    serialize_rules = ('-user.user_routes', '-route.user_routes')
    
    #Validations
    @validates('date')
    def validate_date(self, key, current_date):
        regex = re.compile(r'^((((0[13578])|([13578])|(1[02]))[\/](([1-9])|([0-2][0-9])|(3[01])))|(((0[469])|([469])|(11))[\/](([1-9])|([0-2][0-9])|(30)))|((2|02)[\/](([1-9])|([0-2][0-9]))))[\/]\d{4}$|^\d{4}$')
        if re.fullmatch(regex, current_date):
            return current_date
        return ValueError("Invalid date")
    
    @validates('duration_of_climb')
    def validate_time(self, key, time_taken):
        regex = re.compile(r'^(?:[01]?\d|2[0-3])(?::[0-5]\d){1,2}$')
        if re.fullmatch(regex, time_taken):
            return time_taken
        return ValueError("Enter duration of the climb in a HH:MM format")
    
    @validates('comment')
    def validate_comment(self, key, new_comment):
        if not new_comment or not type(str) or not 5 < len(new_comment) < 500:
          raise ValueError('Your comment must be between 5 and 500 characters')
        return new_comment


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #Relationships
    user = db.relationship('User', back_populates='reviews')
    route = db.relationship('Route', back_populates='reviews')
    
    #Serialize
    serialize_only = ('id', 'rating', 'comment', 'user_id', 'route_id', 'created_at', 'updated_at')
    serialize_rules = ('-user.reviews', '-route.reviews')
    
    #Validations
    
    @validates('rating')
    def validate_comment(self, key, new_rating):
        if not new_rating or not type(int) or not range(1,11):
          raise ValueError('Your rating must be a whole number between 1 and 10')
        return new_rating
      
    @validates('comment')
    def validate_comment(self, key, new_comment):
        if not new_comment or not type(str) or not 5 < len(new_comment) < 500:
          raise ValueError('Your comment must be between 5 and 500 characters')
        return new_comment