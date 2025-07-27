# Unified Dockerfile for Backend
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (includes dev dependencies for development)
# Use npm install if package-lock.json doesn't exist, otherwise use npm ci
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Install tsx globally for development
RUN npm install -g tsx

# Build for production if NODE_ENV is production
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "production" ] ; then npm run build ; fi

# Expose port
EXPOSE 8000

# Set environment
ENV PORT=8000

# Start command based on environment
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev; fi"] 