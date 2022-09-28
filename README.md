## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. Challenge

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ nest start backend
$ nest start bff

# watch mode
$ nest start backend --watch
$ nest start bff --watch

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODO
  
- Manejo de Errores
- Mapear modelos en la capa de repository de ambos proyectos
- Hacer una interface Comun para la comunicacion entre servicios
- Realizar mas tests para los diferentes casos
- Separar los servicios de postApi.service.ts en casos de uso
- Separar los servicios de Comment y User para sus casos de uso individuales

