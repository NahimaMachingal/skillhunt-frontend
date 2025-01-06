#frontend/Dockerfile

# Use official Node.js image as a base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Vite globally (optional if needed for direct CLI usage)
RUN npm install -g vite

# Copy the rest of the application
COPY . .

# Expose port and start the app
EXPOSE 5173
CMD ["npm", "run", "dev"]
