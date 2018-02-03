FROM node:8

# fix for docker based on: https://github.com/npm/npm/issues/13306
# RUN cd $(npm root -g)/npm \
# && npm install fs-extra \
# && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

#install global node packages
# fix found in https://github.com/nodejs/node-gyp/issues/454#issuecomment-101070553:
# RUN npm install --unsafe-perm -gq grunt-cli@1.2.0 gulp@3.9.1 webpack@1.14.0 bower@1.8.0 rimraf webpack-dev-server@1.16.2 node-sass@4.5.0 typings@2.1.0
# RUN npm install --unsafe-perm -gq ionic cordova
RUN npm install -g ionic

WORKDIR /opt/project

# install node packages
RUN cd /opt/project
COPY ./package.json package.json
# --no-bin-links: https://github.com/npm/npm/issues/2380
# RUN npm install --no-bin-links;exit 0
# exit 0 and re-run is a hack to avoid this error: Maximum call stack size exceeded

# RUN npm install --no-bin-links
# RUN npm install node-sass@3.9.3 --no-bin-links

RUN npm install

CMD ionic serve
