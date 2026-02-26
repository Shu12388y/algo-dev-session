# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy server package
COPY apps/server ./apps/server

# Copy shared packages
COPY packages ./packages

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build server
RUN pnpm --filter=server build

# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm in runtime
RUN npm install -g pnpm

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/package.json ./package.json

WORKDIR /app/apps/server

RUN pnpm install

# Expose port (adjust as needed)
EXPOSE 3000

# Run server
CMD ["node", "dist/index.js"]
