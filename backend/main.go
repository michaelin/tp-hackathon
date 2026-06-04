package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	resetDB := flag.Bool("reset-db", false, "reset schema and seed foundational skills")
	dbPath := flag.String("db-path", "skills.db", "sqlite database path")
	flag.Parse()

	db, err := openDB(*dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if *resetDB {
		if err := resetSchema(db); err != nil {
			log.Fatal(err)
		}
		if err := seedFoundationalSkills(db); err != nil {
			log.Fatal(err)
		}
		return
	}

	a := &app{db: db}
	if err := http.ListenAndServe(":8080", a.routes()); err != nil {
		log.Fatal(err)
	}
}
