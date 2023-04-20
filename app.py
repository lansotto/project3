# Import dependencies
import numpy as np
import datetime as dt
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify, request

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///project3.sqlite")

# Reflect an existing database into a new model
Base = automap_base()
Base.metadata.create_all(engine)

# Reflect the tables
Base.prepare(engine,reflect=True)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def homepage():

    return render_template("index.html")

@app.route("/plot")
def plot():

    return render_template("plot.html")

@app.route("/dashboard")
def dashboard():

    return render_template("dashboard.html")

@app.route("/map")
def map():

    return render_template("map.html")

@app.route("/query")
def query():
    df2 = pd.read_sql("select * from movies where vote_average > 5.0", con=engine)
    print(df2)
    return jsonify({"result":"done"})



if __name__ == '__main__':
    app.run(debug=True) 