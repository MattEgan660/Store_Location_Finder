from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import json
import bson.json_util as json_util

def parse_json(data):    
    return json.loads(json_util.dumps(data))

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/markets"
mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('home.html')

@app.route("/Markets")
def markets():
    organic_markets = mongo.db.market_data.find_one()
    return parse_json(organic_markets)

@app.route("/County")
def county():
    county_info = mongo.db.county_data.find_one()
    return parse_json(county_info)


if __name__ == "__main__":
    app.run(debug=True)
