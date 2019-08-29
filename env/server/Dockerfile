FROM ubuntu:bionic

MAINTAINER AryanSadeghi

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt install -y nodejs npm
VOLUME /code
EXPOSE 4788
EXPOSE 8401
COPY ./start.sh /start/start.sh
CMD ["/bin/bash", "/start/start.sh"]