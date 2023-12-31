FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port that the Node.js server will run on
EXPOSE 80

# Start the Node.js server when the container launches
CMD ["node", "app.js"]
