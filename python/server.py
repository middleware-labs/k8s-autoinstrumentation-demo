from flask import Flask, request
import requests
import random
import mysql.connector
app = Flask(__name__)
mydb = mysql.connector.connect(
  host="mysql-service",
  user="root",
  password="middlewareio",
  database="mydata"
)

# Define the endpoint to fetch data
@app.route('/fetch', methods=['GET'])
def fetch_data():
    # Assuming the other service is running on localhost:8000
    other_service_url = 'http://node-service:8080/fetch'
    try:
        # Make a GET request to the other service
        response = requests.get(other_service_url)
        mycursor = mydb.cursor()
        sql = "INSERT INTO requestStatus (id, code) VALUES (%s, %s)"
        val = (random.randint(0,10000), response.status_code)
        mycursor.execute(sql, val)
        mydb.commit()
        mycursor_select = mydb.cursor()
        mycursor_select.execute("SELECT * from requestStatus")
        myresult = mycursor_select.fetchall()
        # If request is successful, return data
        if response.status_code == 200:
            return str(response.content)
        else:
            return 'Failed to fetch data from other service', 500
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # Run the Flask app on port 8080
    app.run(port=8080)

