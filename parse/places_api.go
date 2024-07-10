package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

func GetPlace(name, town, apiKey string) (*PlacesApiPlace, error) {
	query := placesApiPayload{TextQuery: fmt.Sprintf("%s in %s, Iowa", name, town)}
	payload, err := json.Marshal(&query)
	if err != nil {
		return nil, err
	}
	client := &http.Client{}
	req, err := http.NewRequest("POST", "https://places.googleapis.com/v1/places:searchText", bytes.NewReader(payload))
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("X-Goog-Api-Key", apiKey)
	req.Header.Add("X-Goog-FieldMask", "places.displayName,places.location,places.websiteUri,places.primaryType,places.googleMapsUri")
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	responseBody, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	response := PlacesApiResponse{}
	err = json.Unmarshal(responseBody, &response)
	if err != nil {
		return nil, err
	}
	numPlaces := len(response.Places)
	if numPlaces == 0 {
		return nil, errors.New("no places found")
	} else if numPlaces > 2 {
		return nil, errors.New(fmt.Sprintf("found %d places with query %v", numPlaces, query))
	}
	return &response.Places[0], nil
}

type placesApiPayload struct {
	TextQuery string `json:"textQuery"`
}

type PlacesApiErr struct{}

type PlacesApiResponse struct {
	Places []PlacesApiPlace `json:"places"`
}
type PlacesApiPlace struct {
	PlacesApiLocation    `json:"location"`
	GoogleMapsUri        string `json:"googleMapsUri"`
	WebsiteUri           string `json:"websiteUri"`
	PrimaryType          string `json:"primaryType"`
	PlacesApiDisplayName `json:"displayName"`
}
type PlacesApiLocation struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}
type PlacesApiDisplayName struct {
	Text         string `json:"text"`
	LanguageCode string `json:"languageCode"`
}
