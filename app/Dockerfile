# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["node", "build"]
