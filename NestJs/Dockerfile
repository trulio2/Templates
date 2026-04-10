FROM node:22-slim AS base
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install --frozen-lockfile

FROM deps AS build
COPY tsconfig.json nest-cli.json ./
COPY src ./src
RUN yarn build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3030

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

USER node

EXPOSE 3030

CMD ["node", "-r", "tsconfig-paths/register", "dist/main"]
