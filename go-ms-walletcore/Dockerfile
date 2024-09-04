FROM golang:1.22

WORKDIR /app/

RUN apt-get update && apt-get install -y librdkafka-dev
RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN migrate -version

CMD ["tail", "-f", "/dev/null"]