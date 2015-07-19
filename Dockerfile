# ubuntu base
FROM ubuntu:trusty

# Install Node.js
RUN apt-get update
RUN apt-get install --yes nodejs
RUN apt-get install --yes npm

# create code and cd
RUN mkdir -p /code
#RUN cd /code

# copy repo over
ADD ./package.json ./code/package.json
WORKDIR ./code

# install dependencies
RUN npm install