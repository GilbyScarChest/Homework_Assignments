import sqlalchemy
import numpy as np
import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify

engine = create_engine("sqlite:///Resources/hawaii.sqlite", connect_args={'check_same_thread': False}, echo=True)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)


app = Flask(__name__)


@app.route("/")
def Home():
	return (f"choose a route:<br>"
			f"/api/v1.0/precipitation<br>"
			f"/api/v1.0/stations<br>"
			f"/api/v1.0/tobs<br>"
			f"/api/v1.0/<start_date>(start_date) or /api/v1.0/<start_date>(start_date)/<end_date>(end_date)")

@app.route("/api/v1.0/precipitation")
def Precipitation():
# Convert the query results to a Dictionary using date as the key and prcp as the value.
	results = session.query(Measurement.date, Measurement.prcp).all()

	precip = list(np.ravel(results))

# Return the JSON representation of your dictionary
	return jsonify(precip)

@app.route("/api/v1.0/stations")
def Stations():

# Return a JSON list of stations from the dataset.
	results = session.query(Station.station, Station.name).all()

	stations = list(np.ravel(results))

	return jsonify(stations)

@app.route("/api/v1.0/tobs")
def Tobs():

	end_date_2017 = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
	end_date_2017 = dt.datetime.strptime(end_date_2017[0], "%Y-%m-%d")

	tdelta = dt.timedelta(days=365)
	query_date = (end_date_2017 - tdelta)

	# query for the dates and temperature observations from a year from the last data point.
	results = session.query(Measurement.date, Measurement.tobs).filter(Measurement.date >= query_date).all()

	tobs_query = list(np.ravel(results))
	# Return a JSON list of Temperature Observations (tobs) for the previous year.
	return jsonify(tobs_query)


@app.route("/api/v1.0/<start_date>/<end_date>")
def temp_start(start_date, end_date):

	# # Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
	 st_ed_results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
         filter(Measurement.date >= start_date).\
         filter(Measurement.date <= end_date).all()

	 # When given the start and the end date, calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive.
	 #tmin, tavg, tmax = st_ed_results

	 temp = list(np.ravel(st_ed_results))

	 return jsonify(temp)
	 #return jsonify(st_ed_results)

@app.route("/api/v1.0/<start_date>")
def temp_end(start_date):

	# When given the start only, calculate TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.
	st_results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).group_by(Measurement.date).all()
	
	temp = list(np.ravel(st_results))

	return jsonify(temp)




if __name__ == "__main__":
	app.run(debug=False)