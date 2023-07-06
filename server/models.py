from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db
import re
from sqlalchemy.orm import validates




class User(db.Model, SerializerMixin):
    __tablename__ = 'drivers'
    
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
    routes = association_proxy('user_routes', 'route')
    
    
    #Serialize
    
    serialize_only = ()
    serialize_rules = ()
    
    #Validations
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name or not 2 < len(first_name) <15:
          raise ValueError(' Your first name must be between 2 and 15 characters long')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name or not 2 < len(last_name) < 15:
          raise ValueError(' Your last name must be between 2 and 15 characters long')
        return last_name

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name or not 2 < len(user_name) < 35:
          raise ValueError(' Your user name must be between 2 and 35 characters long')
        return user_name

    @validates('age')
    def validate_age(self, key, new_age):
        if not new_age or not 16 <= int(new_age) <= 101:
          raise ValueError(' Your age must be between 16 and 100 years old to join')
        return new_age

    @validates('current_zip_code')
    def validate_zip_code(self, key, my_zip_code):
        if not my_zip_code or not type(int) or not len(my_zip_code) == 5:
            raise ValueError('You must enter a valid zip code to join')
        return my_zip_code
    
    @validates('favorite_mountain')
    def validate_user_name(self, key, mountain):
        if not mountain or not 2 < len(mountain) < 35:
          raise ValueError(' Your favorite mountain must be between 2 and 35 characters long')
        return mountain

    
    @validates('email')
    def emailValid(self, key, current_email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if re.fullmatch(regex, current_email_address):
            return current_email_address
        return ValueError("Invalid email address")
    
    @validates('password')
    def password_valid(self, key, current_password):
        if not current_password or not type(str) and len(current_password) >4:
            raise ValueError("Invalid password")
        return current_password
            
    
class Route(db.Model, SerializerMixin):
    __tablename__ = 'routes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    difficulty_class = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    elevation_gain = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #Relationships
    user_routes = db.relationship('UserRoute', back_populates='route')
    users = db.association_proxy('user_routes', 'user')
    
    #Serialize
    serialize_only = ()
    serialize_rules = ()
    
    #Validations

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
    
    
    #Validations
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    route_id = (db.Integer, db.ForeignKey('routes.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #Relationships
    user = db.relationship('User', back_populates='reviews')
    route = db.relationship('Route', back_populates='reviews')
    
    #Serialize
    
    
    #Validations
























class Mountain(db.Model, SerializerMixin):
    id = db.Column()
    name = db.Column()
    elevation = db.Column()
    number_of_routes = db.Column()
    location = db.Column()
    emergency_contact_information = db.Column()
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    #Relationships
    routes = db.relationship()
    user = association_proxy()
        
    
    #Serialize
    serialize_only = ()
    serialize_rules = ()
    
    #Validations
        
            