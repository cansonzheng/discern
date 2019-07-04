const Router = require('koa-router')
const baiduAI=require('../modules/baiduAI')
const router = new Router()
const menu=require('../static/menu.json')

// 物品识别
// 允许的类型
const typeArr=menu.map(v=>v.type)
router.post('/detect', async ( ctx )=>{
  let {image,type} = ctx.request.body
  // 过滤参数
  if(typeArr.indexOf(type)==-1) return ctx.body = {err:1001}
  image=image.replace(/data\:.*\;base64\,/,'')
  let options={
    baike_num:5
  }
  try{
    let result =await baiduAI[type](image,options)
    ctx.body = result
  }catch(err) {
    console.log(err)
    ctx.body = {err:1000}
  }
})

module.exports = router;