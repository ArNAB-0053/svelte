# Stage 1: Build the SvelteKit app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the SvelteKit app
RUN npm run build

# Stage 2: Run the built app
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=5183

EXPOSE 5183

CMD ["node", "build/index.js"]