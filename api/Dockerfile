# FROM node:carbon
FROM keymetrics/pm2:latest-jessie

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install --only=production

# Bundle app source

COPY . .


EXPOSE 3000

ENV NODE_ENV production
ENV PM2_PUBLIC_KEY r1nd4lc6c4wrraq
ENV PM2_SECRET_KEY 6zy6um5hoz5nl0v

CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["nodemon", "server.js"]
