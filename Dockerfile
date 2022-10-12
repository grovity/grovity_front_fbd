FROM 235640865704.dkr.ecr.us-east-1.amazonaws.com/grovity-node-10
ARG REACT_APP_SERVER
ENV REACT_APP_SERVER=$REACT_APP_SERVER
ENV GENERATE_SOURCEMAP=false
WORKDIR  /grovity_front
ADD . /grovity_front
RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" node ./node_modules/.bin/react-scripts build
EXPOSE 3000/tcp
CMD node server.js
# CMD ./node_modules/.bin/react-scripts start
