# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file to the container
COPY server.env .env

# Build the Next.js application
RUN npm run build

#Test the application
# RUN npm run test #TODO: Add tests

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]