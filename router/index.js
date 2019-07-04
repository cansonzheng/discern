const Router = require('koa-router')
const baiduAI=require('../modules/baiduAI')
const router = new Router()

// 物品识别
// 允许的类型
const typeArr=[
  'advancedGeneral', // 通用物体识别
  'carDetect', // 车辆识别
  'dishDetect', // 菜品识别
]

router.post('/detect', async ( ctx )=>{
  let {image,type} = ctx.request.body
  // 过滤参数
  if(typeArr.indexOf(type)==-1) return res.json({err:1001})
  image=image.replace(/data\:.*\;base64\,/,'')
  let options={
    baike_num:5
  }
  try{
    let result =await baiduAI[type](image,options)
    ctx.body = result
  }catch(err) {
    ctx.body = {err:1000}
  }
})

module.exports = router;