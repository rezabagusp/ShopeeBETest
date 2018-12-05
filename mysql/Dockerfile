
# the image we need for nodejs application
FROM mysql:5.7.24

ENV MYSQL_USER root
ENV MYSQL_ALLOW_EMPTY_PASSWORD true
ENV MYSQL_DATABASE exchanges_rate_currency

COPY ./exchanges_rate_currency.sql /docker-entrypoint-initdb.d/

EXPOSE 3306