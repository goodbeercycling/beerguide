package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"reflect"
	"testing"
)

func TestGetAllPlaces(t *testing.T) {
	apiKey := os.Getenv("PLACES_API_KEY")
	if apiKey == "" {
		t.Fatal("the 'PLACES_API_KEY' environment variable should be set")
	}
	reader, err := os.Open("bars.csv")
	writer := csv.NewWriter(os.Stdout)
	if err != nil {
		t.Fatal(err)
	}
	csvReader := csv.NewReader(reader)
	//burn title line
	_, err = csvReader.Read()
	if err != nil {
		t.Fatal(err)
	}
	for {
		record, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			t.Fatal(err)
		}

		if len(record) < 4 {
			writer.Write([]string{""})
			continue
		}
		barName := record[3]
		town := record[2]
		if town == "" || barName == "" {
			writer.Write([]string{town, barName})
			continue
		}
		place, err := GetPlace(barName, town, apiKey)
		if err != nil {
			writer.Write([]string{town, barName, fmt.Sprintf("places error for %s in %s: %v", barName, town, err)})
			continue
		}
		barDisplayName := place.Text
		googleMapsUri := place.GoogleMapsUri
		latitude := place.Latitude
		longitude := place.Longitude
		websiteUri := place.WebsiteUri
		writer.Write([]string{town, barName, barDisplayName, googleMapsUri, fmt.Sprintf("%f", latitude), fmt.Sprintf("%f", longitude), websiteUri, place.PrimaryType})
	}
	writer.Flush()
}

func TestGetPlace(t *testing.T) {
	apiKey := os.Getenv("PLACES_API_KEY")
	if apiKey == "" {
		t.Fatal("the 'PLACES_API_KEY' environment variable should be set")
	}
	place, err := GetPlace("The Busted Cup Brewhouse", "Burlington", apiKey)
	if err != nil {
		t.Fatalf("error making request: %v", err)
	}
	fmt.Printf("print name: %s", place.PlacesApiDisplayName.Text)
	rawPayload, err := json.MarshalIndent(&place, "", "  ")
	fmt.Println(string(rawPayload))
}

func TestPlacesApiResponseSerialization(t *testing.T) {
	reader, err := os.ReadFile("data/places_api_response.json")
	if err != nil {
		t.Fatal(err)
	}
	response := PlacesApiResponse{}
	err = json.Unmarshal(reader, &response)
	if err != nil {
		t.Fatal(err)
	}
	if len(response.Places) != 1 {
		t.Fatalf("expected 1 place, found %d", len(response.Places))
	}
	expected := PlacesApiPlace{
		PlacesApiLocation: PlacesApiLocation{
			Latitude:  40.8115461,
			Longitude: -91.1024535,
		},
		GoogleMapsUri: "https://maps.google.com/?cid=3073751871747134797",
		WebsiteUri:    "http://goodburlington.com/",
		PrimaryType:   "restaurant",
		PlacesApiDisplayName: PlacesApiDisplayName{
			Text:         "Good Restaurant + Lounge",
			LanguageCode: "en",
		},
	}
	found := response.Places[0]
	if !reflect.DeepEqual(found, expected) {
		t.Fatalf("expected:\n%v\nfound:\n%v\n", expected, found)
	}
}
