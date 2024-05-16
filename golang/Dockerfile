FROM golang:1.22.1
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o main .
#RUN apk --no-cache add curl
RUN apt-get update && apt-get install -y telnet
EXPOSE 8080
CMD [ "/app/main"]
