
# Cria uma nova migração
create_migration:
	migrate create -ext=sql -dir=internal/database/migrations -seq init

# Aplica migrações
migrate_up:
	migrate -path=internal/database/migrations -database "mysql://root:root@tcp(mysql-walletcore:3306)/wallet?charset=utf8&parseTime=True&loc=Local" -verbose up

# Reverte migrações
migrate_down:
	migrate -path=internal/database/migrations -database "mysql://root:root@tcp(mysql-walletcore:3306)/wallet?charset=utf8&parseTime=True&loc=Local" -verbose down

# Executa o script de seed
seed:
	go run internal/database/seed/seed.go

.PHONY: create_migration migrate_up migrate_down seed