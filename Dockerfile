# Use the official Node.js image as a base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
# COPY package*.json ./

# Install dependencies
RUN npm init -y && \
    npm install body-parser compilex express && \
    npm install -g nodemon && \
    apt-get update && \
    apt-get install -y python3

# Expose port 8000 (the port your Express app is running on)
EXPOSE 8000

# Copy the rest of the application code to the container
COPY . .

# Command to run the application with nodemon
CMD ["nodemon", "api.js"]