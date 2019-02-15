const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const config = require('./config');
const models = require('./app/models');
const routers = require('./app/routers');

models.init();

const app = new Koa();

app.use(
  jwt({ secret: config.secret }).unless({
    path: [/^\/api\/auth/]
  })
);

app.use(bodyparser());

app.use(logger());

app.use(routers.routes());

app.listen(config.http.port, () => {
  console.log(`Server is listening on port ${config.http.port}`);
});
