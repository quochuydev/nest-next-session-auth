(cd infra/dev && docker-compose up -d)
(cd web && yarn)
(cd api && yarn)
(cd api && yarn migration:run)