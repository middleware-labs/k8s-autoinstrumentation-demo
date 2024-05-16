package main

import (
        "io"
        "log"
        "math/rand"
        "net/http"
        "time"
)

// Simple example HTTP service for trying out Beyla.
// 40% of calls will fail with HTTP status 500.
func handleRequest(rw http.ResponseWriter, _ *http.Request) {
        time.Sleep(time.Duration(rand.Float64()*400.0) * time.Millisecond)
        statusCode := 200
        if rand.Int31n(100) < 60 {
                rw.WriteHeader(statusCode) 
                if _, err := io.WriteString(rw, "Hello from the Go HTTP service.\n"); err != nil {
                        log.Fatal(err)
                }
               
        } else {
                statusCode = 500
                rw.WriteHeader(statusCode)
                if _, err := io.WriteString(rw, "Simulating an error response with HTTP status 500.\n"); err != nil {
                        log.Fatal(err)
                }
        }
}


func main() {
        log.Println("Listening on http://0.0.0.0:8080")
        log.Fatal(http.ListenAndServe(":8080", http.HandlerFunc(handleRequest)))
}

