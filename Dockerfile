# Node v10
FROM node:10.15.3

#install global node packages
RUN npm install --unsafe-perm -gq ionic@4.5.0 --no-interactive

WORKDIR /opt/project

# install node packages
RUN cd /opt/project
COPY ./package.json package.json

RUN npm install

CMD ionic serve
