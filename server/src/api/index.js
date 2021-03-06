const Router = require('koa-router');
const auth = require('./auth');
const bottle = require('./bottle');
const hub = require('./hub');
const medicine = require('./medicine');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/bottle', bottle.routes());
api.use('/hub', hub.routes());
api.use('/medicine', medicine.routes());

module.exports = api;