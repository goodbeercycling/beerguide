package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strconv"
	"testing"
)

func TestConvertCaseys(t *testing.T) {
	reader, err := os.Open("data/2025_caseys_formatted.csv")
	if err != nil {
		t.Fatal(err)
	}
	csvReader := csv.NewReader(reader)
	caseys := make([]LatLong, 0)
	for {
		record, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			t.Fatal(err)
		}
		if len(record) == 2 {
			lat, err := strconv.ParseFloat(record[0], 64)
			if err != nil {
				t.Fatal(err)
			}
			lng, err := strconv.ParseFloat(record[1], 64)
			if err != nil {
				t.Fatal(err)
			}
			latlng := LatLong{
				Latitude:  lat,
				Longitude: lng,
			}
			caseys = append(caseys, latlng)
		}
	}
	val := map[string][]LatLong{
		"caseys": caseys,
	}
	ser, err := json.Marshal(&val)
	if err != nil {
		t.Fatal(err)
	}
	fmt.Println(string(ser))
}

type LatLong struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lng"`
}
