#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, session
from flask_restful import Resource, Api
import os
# Local importscd ..
from config import app, db, api
from models import User, Route, Review, UserRoute, Mountain
from datetime import datetime
# Views go here!


@app.route('/')
def index():
    return '<h1>Peak Bagger</h1>' 


@app.route("/check-user", methods=["GET"])
def check_user():
    if id := session.get("user_id"):
        if user := db.session.get(User, id):
            return make_response(user.to_dict(), 200)
    
    return make_response({"error": "Unauthorized"}, 401)



@app.route("/signup" , methods=["POST"])
def signup():
    try:
        data = request.get_json()
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(), 201)
    except Exception as e:
        return make_response({"error": str(e) }, 400)

class SignIn(Resource):
    def post(self):

        email = request.get_json()["email"]
        password = request.get_json()["password"]

        user = User.query.filter(User.email == email).first()

        if user:
            # import ipdb; ipdb.set_trace()
            if user.password == password:
                session["user_id"] = user.id
                return user.to_dict(), 200
        return make_response({"error": "Unauthorized"}, 401)
    
api.add_resource(SignIn, "/signin")

class SignOut(Resource):
    def delete(self):
        
        session["user_id"] = None
                
        return make_response({}, 204)
        

api.add_resource(SignOut, "/signout")


class Users(Resource):

    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        if users:
            return make_response(users, 200)
        return make_response("no users found", 404)
        
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user_by_id = db.session.get(User, id)
        if user_by_id:
            return make_response(user_by_id.to_dict(), 200)
        return make_response(({"error": "404: User not found."}) ,404)
    
    def delete(self, id):
        try:
            user = db.session.get(User, id)
            db.session.delete(user)
            db.session.commit()
            return make_response(({}),204)
        except Exception as e:
            return make_response(({"error": "404: User not found."}),404)
        
    def patch(self, id):
        try:
            data = request.get_json()
            user = db.session.get(User, id)
            for k, v in data.items():
                setattr(user, k, v)
            db.session.commit()
            return make_response((user.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
        

api.add_resource(UserById, "/users/<int:id>")

class Routes(Resource):

    def get(self):
        routes = [r.to_dict() for r in Route.query.all()]
        if routes:
            return make_response(routes, 200)
        return make_response("No routes found", 404)
        
api.add_resource(Routes, '/routes')

class RouteById(Resource):
    def get(self, id):
        route_by_id = db.session.get(Route, id)
        if route_by_id:
            return make_response(route_by_id.to_dict(), 200)
        return make_response(({"error": "404: Route not found."}) ,404)
    
    def delete(self, id):
        try:
            route = db.session.get(Route, id)
            db.session.delete(route)
            db.session.commit()
            return make_response(({}),204)
        except Exception as e:
            return make_response(({"error": "404: Route not found."}),404)
        
    def patch(self, id):
        try:
            data = request.get_json()
            route = db.session.get(Route, id)
            for k, v in data.items():
                setattr(route, k, v)
            db.session.commit()
            return make_response((route.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
        

api.add_resource(RouteById, "/routes/<int:id>")

class Mountains(Resource):
    def get(self):
        mountains = [m.to_dict() for m in Mountain.query.all()]
        return make_response(mountains, 200)
        
api.add_resource(Mountains, '/mountains')

class MountainById(Resource):
    def get(self, id):
        mountain_by_id = db.session.get(User, id)
        if mountain_by_id:
            return make_response(mountain_by_id.to_dict(), 200)
        return make_response(({"error": "404: Mountain not found."}) ,404)
    
    def delete(self, id):
        try:
            mountain = db.session.get(Mountain, id)
            db.session.delete(mountain)
            db.session.commit()
            return make_response(({}),204)
        except Exception as e:
            return make_response(({"error": "404: Mountain not found."}),404)
        
    def patch(self, id):
        try:
            data = request.get_json()
            mountain = db.session.get(Mountain, id)
            for k, v in data.items():
                setattr(mountain, k, v)
            db.session.commit()
            return make_response((mountain.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
        
api.add_resource(MountainById, "/mountain/<int:id>")

class UserRoutes(Resource):
    def get(self):
        user_routes =[u.to_dict() for u in UserRoute.query.all()]
        return make_response(user_routes, 200)
    
    def post(self):
        try:
            data = request.get_json()
            user_route = UserRoute(**data)
            db.session.add(user_route)
            db.session.commit()
            # route = UserRoute(user_id= session.get('user_id'), route_id=route.id )
            # db.session.add(route)
            # db.session.commit()
            # import ipdb; ipdb.set_trace()
            return make_response(({"user_route":user_route.to_dict()}), 201)
        except Exception as e:
            return make_response(({"error": str(e)}),400)

api.add_resource(UserRoutes, "/user_routes")

class Reviews(Resource):
    def get(self):
        reviews =[r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 200)
    
    def post(self):
        try:
            data = request.get_json()
            review = Review(**data)
            db.session.add(review)
            db.session.commit()
            # route = Review(user_id= session.get('user_id'), route_id=route.id )
            # db.session.add(route)
            # db.session.commit()
            # import ipdb; ipdb.set_trace()
            return make_response(({"review":review.to_dict()}), 201)
        except Exception as e:
            return make_response(({"error": str(e)}),400)

api.add_resource(Reviews, "/reviews")














if __name__ == '__main__':    
    app.run(port=5555, debug=True)





















