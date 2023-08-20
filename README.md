# @kecoyo/egg-jwt

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@kecoyo/egg-jwt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@kecoyo/egg-jwt
[travis-image]: https://img.shields.io/travis/@kecoyo/egg-jwt.svg?style=flat-square
[travis-url]: https://travis-ci.org/@kecoyo/egg-jwt
[codecov-image]: https://img.shields.io/codecov/c/github/@kecoyo/egg-jwt.svg?style=flat-square
[codecov-url]: https://codecov.io/github/@kecoyo/egg-jwt?branch=master
[david-image]: https://img.shields.io/david/@kecoyo/egg-jwt.svg?style=flat-square
[david-url]: https://david-dm.org/@kecoyo/egg-jwt
[snyk-image]: https://snyk.io/test/npm/@kecoyo/egg-jwt/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@kecoyo/egg-jwt
[download-image]: https://img.shields.io/npm/dm/@kecoyo/egg-jwt.svg?style=flat-square
[download-url]: https://npmjs.org/package/@kecoyo/egg-jwt

Egg's JWT(JSON Web Token Authentication Plugin)

## Important

> @kecoyo/egg-jwt use koa-jwt2

## Install

```bash
$ npm i @kecoyo/egg-jwt --save
```

or

```
yarn add @kecoyo/egg-jwt
```

## Usage

```js
// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: "@kecoyo/egg-jwt"
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.jwt = {
  secret: "123456"
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```javascript
// app/router.js
"use strict";

module.exports = app => {
  app.get("/", app.jwt, "render.index"); // use old api app.jwt
  app.get("/login", "login.index");
  app.get("/success", "success.index"); // is setting in config.jwt.match
};

// app/controller/render.js
("use strict");

module.exports = app => {
  class RenderController extends app.Controller {
    *index() {
      this.ctx.body = "hello World";
    }
  }
  return RenderController;
};

// app/controller/login.js
("use strict");

module.exports = app => {
  class LoginController extends app.Controller {
    *index() {
      this.ctx.body = "hello admin";
    }
  }
  return LoginController;
};

// app/controller/success.js
("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
    *index() {
      this.ctx.body = this.ctx.state.user;
    }
  }
  return SuccessController;
};
```

Then

```
curl 127.0.0.1:7001
// response 401

curl 127.0.0.1:7001/login
// response hello admin

curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0OTAwMTU0MTN9.ehQ38YsRlM8hDpUMKYq1rHt-YjBPSU11dFm0NOroPEg" 127.0.0.1:7001/success
// response {foo: bar}
```

## How To Create A Token

```
const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
```

For more options, check [here](https://github.com/auth0/node-jsonwebtoken)

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
