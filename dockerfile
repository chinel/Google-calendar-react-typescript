# Use the official Node.js image.
FROM node:20-alpine

# Install a simple HTTP server for serving static content.
RUN npm install -g serve

# Create and change to the app directory.
WORKDIR /app

# Copy the dependency files to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Change to the build directory.
WORKDIR /app/dist

# Start the application using serve.
CMD ["serve", "-s", "."]
