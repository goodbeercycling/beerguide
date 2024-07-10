package main

type DayRoute struct {
	View      MapView         `json:"view"`
	Towns     []*BarTown      `json:"towns"`
	Waypoints *DailyWaypoints `json:"waypoints"`
	Bars      BarRecords      `json:"bars"`
}

func NewDayRoute(day string) DayRoute {
	view := dayView(day)
	return DayRoute{
		View:      view,
		Towns:     nil,
		Waypoints: nil,
		Bars:      nil,
	}
}

func dayView(day string) MapView {
	view := MapView{}
	switch day {
	case "Sunday":
		view.Position = Location{
			Lat: 41.1,
			Lng: -95.5,
		}
		view.Zoom = 9
	case "Monday":
		view.Position = Location{
			Lat: 41.21,
			Lng: -95.12,
		}
		view.Zoom = 9
	case "Tuesday":
		view.Position = Location{
			Lat: 41.44,
			Lng: -94.51,
		}
		view.Zoom = 9
	case "Wednesday":
		view.Position = Location{
			Lat: 41.36,
			Lng: -93.45,
		}
		view.Zoom = 9
	case "Thursday":
		view.Position = Location{
			Lat: 41.27,
			Lng: -92.85,
		}
		view.Zoom = 9
	case "Friday":
		view.Position = Location{
			Lat: 41.0,
			Lng: -91.88,
		}
		view.Zoom = 9
	case "Saturday":
		view.Position = Location{
			Lat: 40.9,
			Lng: -91.33,
		}
		view.Zoom = 10
	default:
		panic("unable to find a map view for this day")
	}
	return view
}

type MapView struct {
	Position Location `json:"position"`
	Zoom     uint8    `json:"zoom"`
}

type Location struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type BarDetails struct {
	Name     string   `json:"name"`
	Position Location `json:"position"`
	Url      string   `json:"url"`
	Town     string   `json:"town"`
	Comments string   `json:"comments"`
	Address  string   `json:"address"`
	Image    string   `json:"image"`
}

type BarRecords map[string]BarDetails

type WeekRecords map[string]BarRecords

type BarTown struct {
	Name string   `json:"name"`
	Bars []string `json:"bars"`
}

type Towns map[string][]*BarTown
