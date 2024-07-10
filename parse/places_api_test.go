package main

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"
	"testing"
)

func TestPlaceApi(t *testing.T) {

}

func TestGetPlace(t *testing.T) {
	apiKey := os.Getenv("PLACES_API_KEY")
	if apiKey == "" {
		t.Fatal("the 'PLACES_API_KEY' environment variable should be set")
	}
	place, err := GetPlace("Melody's Kitchen", "Eddyville", apiKey)
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
