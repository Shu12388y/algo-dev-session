# Build stage
FROM node:22 AS builder

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy codeJudge package
COPY apps/codeJudge ./apps/codeJudge

# Copy shared packages
COPY packages ./packages

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build shared packages and codeJudge
RUN pnpm --filter=@repo/queues build \
    && pnpm --filter=codejudge build

# Runtime stage
FROM ubuntu:24.04

WORKDIR /app

# Install Node.js and other runtimes
RUN apt-get update && apt-get install -y \
    # Node.js
    curl \
    gnupg \
    # C/C++ compiler
    build-essential \
    gcc \
    g++ \
    gdb \
    # Python
    python3 \
    python3-pip \
    # Additional utilities
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

# Copy workspace manifests and packages
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/codeJudge/package.json ./apps/codeJudge/package.json
COPY --from=builder /app/packages ./packages

# Install production dependencies for codeJudge and its workspace deps
RUN pnpm --filter=codejudge... install --frozen-lockfile --prod

# Copy built artifacts
COPY --from=builder /app/apps/codeJudge/dist ./apps/codeJudge/dist

WORKDIR /app/apps/codeJudge

RUN pnpm install

# Expose port (adjust as needed)
EXPOSE 3001

# Run codeJudge
CMD ["node", "dist/index.js"]
