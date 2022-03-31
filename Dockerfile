## AWS-RDS-Node-API
FROM public.ecr.aws/ubuntu/ubuntu:20.04_stable
RUN apt-get update
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs
RUN ln -s /usr/bin/nodejs /usr/local/bin/node


ENV NODE_ENV=production

# change to directory
WORKDIR /AWS-RDS-Node-API

COPY ["package.json", "package-lock.json*", "./AWS-RDS-Node-API/"]

RUN npm install --production

COPY . /AWS-RDS-Node-API

EXPOSE 3040
CMD [ "node", "server.js" ]
