package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	dayRoutes, err := ParseCsv(reader)
	if err != nil {
		log.Fatal(err)
	}
	//js, err := json.MarshalIndent(&barRecords, "", "  ")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("%s\n", js)
	ts, err := json.MarshalIndent(&dayRoutes, "", "  ")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", ts)
}
