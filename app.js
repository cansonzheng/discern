const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const api= require('./router/index')

app.use(bodyParser())
app.use(static(
  path.join( __dirname,'./static')
))

let router = new Router()
router.use('/api', api.routes(), api.allowedMethods())

app.use(router.routes())
.use(router.allowedMethods())

app.listen(3210)