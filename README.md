# nest-next-session-auth

Installation

```
(cd infra/local && docker-compose up -d)
(cd web && yarn)
(cd api && yarn)
(cd api && yarn migration:run)
```

Web

```
(cd web && yarn dev)
```

API

```
(cd api && yarn start:dev)
```
