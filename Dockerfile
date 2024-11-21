# Base image
FROM node:20.15.0-bookworm-slim
USER 1000
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
# Bundle app source
COPY --chown=1000:0 . /usr/src/app
EXPOSE 8888
CMD ["npm", "start"]

