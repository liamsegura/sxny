# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your server will run on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
