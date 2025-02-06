<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


Перед тем как запустить приложение необходимо мигрировать схему в чистую базу, в противном случае при `start:dev` будет ошибка `DATABASE_URL not found`

.env:
```env
DATABASE_URL=postgresql://username:userpassword@hostname:5432/postgres
```

```text
[System Information]
OS Version     : macOS 23.6.0
NodeJS Version : v20.16.0
NPM Version    : 10.8.1

[Nest CLI]
Nest CLI Version : 10.4.4

[Nest Platform Information]
platform-express version : 10.4.1
schematics version       : 10.1.3
testing version          : 10.4.1
common version           : 10.4.1
core version             : 10.4.1
cli version              : 10.4.4
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript commercial-bot.

## Installation

```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# migrate schemas
$ npx prisma migrate dev --name init
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
