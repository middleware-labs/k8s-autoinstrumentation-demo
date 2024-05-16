# Use the official Python image as a base
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Flask and requests module
RUN pip install mysql-connector-python Flask requests 

# Expose port 8080 to the outside world
EXPOSE 8080

# Define environment variable
ENV FLASK_APP=server.py

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]

