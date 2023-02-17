# Define node version
FROM node:16.17.1

# Create app directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV development
ENV MONGODB_DATABASE eco-web 
ENV MONGODB_CONNECTION_STRING mongodb://eco-web_root:c2ed585d2338ed58@52.3.253.220:27028
ENV JWT_SECRET 169d88b975cf33adc84a644b9461fca3c074378f0134c29b23b27976a424045a

ADD package.json /app/package.json

RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm", "run", "start"]