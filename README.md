eal# nest-next-session-auth

Installation

```
(cd infra/dev && docker-compose up -d) &&
(cd web && yarn) &
(cd api && yarn) &
(cd api && yarn migration:run)
```

Web & API

```
(cd web && yarn dev) &
(cd api && yarn start:dev)
```

E2E test

```
(cd infra/e2e && docker-compose up -d)
(cd e2e && yarn test)
```

STOP

```
(cd infra/dev && docker-compose down)
```
