
FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD my-secret-pw

ENV MYSQL_DATABASE blog

ENV MYSQL_USER bloguser

ENV MYSQL_PASSWORD blogpassword

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3000
