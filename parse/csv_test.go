package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"testing"
)

func TestParseCsv(t *testing.T) {
	reader, err := os.Open("bars.csv")
	if err != nil {
		t.Fatal(err)
	}
	dayRoutes, err := ParseCsv(reader)
	if err != nil {
		t.Fatal(err)
	}
	js, err := json.MarshalIndent(&dayRoutes, "", "  ")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", js)
}
