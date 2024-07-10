package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type DailyWaypoints []Waypoint

type Waypoint struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

func LoadWaypoints(day string) (*DailyWaypoints, error) {
	fileName := fmt.Sprintf("data/%s.waypoints.json", strings.ToLower(day))
	data, err := os.ReadFile(fileName)
	if err != nil {
		return nil, err
	}
	result := &DailyWaypoints{}
	err = json.Unmarshal(data, result)
	return result, err
}
