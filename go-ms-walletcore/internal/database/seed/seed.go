package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(mysql-walletcore:3306)/wallet?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	seedFiles := []string{
		"internal/database/seed/000001_seed.sql",
		"internal/database/seed/000002_seed.sql",
	}

	for _, seedFile := range seedFiles {
		// Leitura do arquivo SQL
		sqlBytes, err := os.ReadFile(seedFile)
		if err != nil {
			log.Fatalf("Error reading seed file %s: %v", seedFile, err)
		}

		sqlStatements := string(sqlBytes)

		// Execução das instruções SQL
		fmt.Printf("Executing SQL from file: %s\n", seedFile)
		_, err = db.Exec(sqlStatements)
		if err != nil {
			log.Fatalf("Error executing seed script %s: %v", seedFile, err)
		}
	}

	fmt.Println("Seed data inserted successfully!")
}
