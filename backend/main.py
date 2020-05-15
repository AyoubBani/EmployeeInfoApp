from flask import Flask, jsonify, url_for, redirect, request
from flask_restful import Api, Resource
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


app.config["MONGO_URI"] = "mongodb://localhost:27017/employees"
APP_URL = "http://127.0.0.1:5000"

mongo = PyMongo(app)


def fetchEmployees():
    cursor = mongo.db.employees.find({}, {"_id": 0, "update_time": 0})
    data = []
    for employee in cursor:
        data.append(employee)

    return data


class Employees(Resource):
    def get(self, registration=None, department=None):
        return jsonify({"response": fetchEmployees()})

    def put(self, username):
        print(username)
        if username:
            data = request.get_json()
            print(data)
            mongo.db.employees.replace_one(
                {'username': username}, data, upsert=True)
            cursor = mongo.db.employees.find(
                {}, {"_id": 0, "update_time": 0})

            return {"response": fetchEmployees()}
        else:
            return {"response": "Username is missing"}


api = Api(app)
api.add_resource(Employees, "/employees", endpoint="employees")
api.add_resource(Employees, "/employees/<string:username>",
                 endpoint="update_employee")

if __name__ == "__main__":
    app.run(debug=True)
