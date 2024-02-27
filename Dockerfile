FROM node:20-alpine

WORKDIR /app

# Setup
COPY . .
RUN npm ci
RUN npm run build

# Runtime
ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "."]
