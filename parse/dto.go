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
			Lat: 43.2,
			Lng: -95.9,
		}
		view.Zoom = 10
	case "Monday":
		view.Position = Location{
			Lat: 43.4,
			Lng: -95.08,
		}
		view.Zoom = 9
	case "Tuesday":
		view.Position = Location{
			Lat: 43.4,
			Lng: -94.57,
		}
		view.Zoom = 11
	case "Wednesday":
		view.Position = Location{
			Lat: 42.9,
			Lng: -93.77,
		}
		view.Zoom = 11
	case "Thursday":
		view.Position = Location{
			Lat: 42.5,
			Lng: -93.02,
		}
		view.Zoom = 11
	case "Friday":
		view.Position = Location{
			Lat: 42.6,
			Lng: -92.34,
		}
		view.Zoom = 11
	case "Saturday":
		view.Position = Location{
			Lat: 42.7,
			Lng: -91.67,
		}
		view.Zoom = 11
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
