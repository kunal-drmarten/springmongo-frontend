# # Stage 1: Build Angular application
# FROM node:lts-alpine3.20 AS builder

# WORKDIR /app

# COPY . .

# RUN npm install && npm run ng build

# # # Stage 2: Serve the AngularJS application
# FROM nginx:alpine

# # Copy custom Nginx configuration
# COPY default.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# COPY --from=builder /app/dist/springmongo-frontend/browser .


# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Step 1: Build Stage
FROM node:lts-alpine3.20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run ng build

# Step 2: Serve Stage
FROM node:lts-alpine3.20

# Set the working directory
WORKDIR /usr/src/app

# Install http-server globally
RUN npm install -g http-server

# Copy the build output from the builder stage
COPY --from=builder /app/dist/springmongo-frontend/browser .

# Expose the port that http-server will run on
EXPOSE 80
# Start the http-server
CMD ["http-server", "-p", "80", "--cors"]


