# Makefile para ProcessTool con Docker
# Uso: make [comando]
# Ejemplo: make migrate, make artisan make:model Product

.PHONY: help up down build rebuild logs bash ps clean

UID := $(shell id -u)
GID := $(shell id -g)
DOCKER_EXEC = docker-compose exec -u $(UID):$(GID)

# ====================
# AYUDA (comando principal)
# ====================
help:
	@echo "🚀 ProcessTool Docker - Comandos disponibles:"
	@echo ""
	@echo "📦 CONFIGURACIÓN:"
	@echo "  make build          Construir imágenes Docker"
	@echo "  make rebuild        Reconstruir todo desde cero"
	@echo "  make clean          Limpiar Docker (cuidado)"
	@echo ""
	@echo "🚀 INICIAR/DETENER:"
	@echo "  make up             Iniciar todos los servicios"
	@echo "  make down           Detener todos los servicios"
	@echo "  make restart        Reiniciar todos los servicios"
	@echo ""
	@echo "🔍 MONITOREO:"
	@echo "  make ps             Ver estado de contenedores"
	@echo "  make logs           Ver logs de backend"
	@echo "  make logs-all       Ver logs de todos los servicios"
	@echo "  make logs-sql       Ver logs de SQL Server"
	@echo "  make logs-redis     Ver logs de Redis"
	@echo ""
	@echo "💻 DESARROLLO LARAVEL:"
	@echo "  make bash           Entrar al contenedor backend"
	@echo "  make tinker         Abrir Tinker interactivo"
	@echo "  make migrate        Ejecutar migraciones"
	@echo "  make fresh          Refrescar base de datos con seeds"
	@echo "  make seed           Ejecutar seeders"
	@echo "  make test           Ejecutar tests"
	@echo "  make optimize       Optimizar Laravel"
	@echo ""
	@echo "🛠️  COMANDOS ARTISAN/COMPOSER:"
	@echo "  make artisan [cmd]  Ejecutar comando artisan"
	@echo "     Ej: make artisan make:model Product"
	@echo "     Ej: make artisan route:list"
	@echo "  make composer [cmd] Ejecutar comando composer"
	@echo "     Ej: make composer require laravel/sanctum"
	@echo ""
	@echo "🗄️  BASE DE DATOS:"
	@echo "  make db-bash        Entrar a SQL Server"
	@echo "  make db-backup      Crear backup de base de datos"
	@echo "  make db-list        Listar bases de datos"
	@echo ""
	@echo "📧 EMAIL TESTING:"
	@echo "  make mail-ui        Abrir Mailpit Web UI"
	@echo ""
	@echo "Ejemplos prácticos:"
	@echo "  make up && make migrate"
	@echo "  make artisan make:model BusinessRule -m"
	@echo "  make composer require laravel/sanctum"

# ====================
# CONFIGURACIÓN DOCKER
# ====================
up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

build:
	docker-compose build --no-cache

rebuild: down build up

# ====================
# MONITOREO
# ====================
ps:
	docker-compose ps

logs-all:
	docker-compose logs -f

logs-sql:
	docker-compose logs -f sqlserver

logs-redis:
	docker-compose logs -f redis

# ====================
# ACCESO A CONTENEDORES
# ====================
exec-backend:
	docker-compose exec -u $(UID):$(GID) backend bash

exec-frontend:
	docker exec -it processtool-frontend-1 sh

exec-db:
	docker-compose exec sqlserver bash

# ====================
# LARAVEL - COMANDOS COMUNES
# ====================
tinker:
	$(DOCKER_EXEC) -e HOME=/tmp backend php artisan tinker

migrate:
	$(DOCKER_EXEC) backend php artisan migrate

fresh:
	$(DOCKER_EXEC) backend php artisan migrate:fresh --seed

seed:
	$(DOCKER_EXEC) backend php artisan db:seed

test:
	$(DOCKER_EXEC) backend php artisan test

optimize:
	$(DOCKER_EXEC) backend php artisan optimize

key:
	$(DOCKER_EXEC) backend php artisan key:generate

storage:
	$(DOCKER_EXEC) backend php artisan storage:link

clear:
	$(DOCKER_EXEC)c backend php artisan optimize:clear

# ====================
# ARTISAN Y COMPOSER DINÁMICOS
# ====================
artisan:
	$(DOCKER_EXEC) backend php artisan $(filter-out $@,$(MAKECMDGOALS))

composer:
	$(DOCKER_EXEC) backend composer $(filter-out $@,$(MAKECMDGOALS))

# ====================
# BASE DE DATOS
# ====================
db-backup:
	docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Processtool@2024" -Q "BACKUP DATABASE processtool_db TO DISK='/backups/backup-$$(date +%Y%m%d-%H%M%S).bak'"

db-list:
	docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Processtool@2024" -Q "SELECT name, state_desc FROM sys.databases"

db-tables:
	docker-compose exec sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "Processtool@2024" -Q "USE processtool_db; SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES"

# ====================
# EMAIL TESTING
# ====================
mail-ui:
	@echo "📧 Abriendo Mailpit Web UI..."
	@echo "URL: http://localhost:8025"
	start http://localhost:8025

# ====================
# MANTENIMIENTO
# ====================
clean:
	docker-compose down -v
	docker system prune -a -f
	@echo "✅ Docker limpiado completamente"

# ====================
# PARA IGNORAR TARGETS NO ENCONTRADOS
# ====================
%:
	@: