package main

import (
	"encoding/csv"
	"io"
	"log"
	"strconv"
)

func ParseCsv(reader io.Reader) (map[string]DayRoute, error) {
	csvReader := csv.NewReader(reader)
	weekRecords := make(WeekRecords)
	towns := make(Towns)
	for {
		record, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		barId := record[1]
		if barId == "" {
			continue
		}

		lat, err := strconv.ParseFloat(record[6], 64)
		if err != nil {
			log.Fatal(err)
		}
		lng, err := strconv.ParseFloat(record[7], 64)
		if err != nil {
			log.Fatal(err)
		}
		townName := record[2]
		barDetails := BarDetails{
			Name: record[3],
			Position: Location{
				Lat: lat,
				Lng: lng,
			},
			Url:      record[9],
			Town:     townName,
			Comments: record[10],
			Address:  record[4],
			Image:    record[5],
		}
		day := record[0]
		barRecords, ok := weekRecords[day]
		if !ok {
			barRecords = make(BarRecords)
			weekRecords[day] = barRecords
		}
		barRecords[barId] = barDetails

		barTowns, ok := towns[day]
		if !ok {
			barTowns = make([]*BarTown, 0)
			towns[day] = barTowns
		}
		townFound := false
		for _, dayTown := range barTowns {
			if dayTown.Name == townName {
				dayTown.Bars = append(dayTown.Bars, barId)
				townFound = true
			}
		}
		if !townFound {
			barTown := BarTown{
				Name: townName,
				Bars: []string{barId},
			}
			barTowns = append(barTowns, &barTown)
			towns[day] = barTowns
		}

	}
	result := make(map[string]DayRoute)
	for _, day := range []string{"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"} {
		dayRoute := NewDayRoute(day)
		dayRoute.Towns = towns[day]
		dayRoute.Bars = weekRecords[day]
		waypoints, err := LoadWaypoints(day)
		if err != nil {
			log.Fatal(err)
		}
		dayRoute.Waypoints = waypoints
		result[day] = dayRoute
	}

	return result, nil
}
