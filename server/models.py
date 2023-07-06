from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

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
        
            