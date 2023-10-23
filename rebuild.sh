docker container stop giga-chat
docker container rm giga-chat
docker image rm giga-chati
docker build -t giga-chati .
docker run -d -p 4000:4000 --name giga-chat giga-chati
docker container ls