const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
const APP_ID = "16518458";
const API_KEY = "j82VNP810tFjASlWksEGybT0";
const SECRET_KEY = "tG2rnmvVkpYiDGt0Dzqc2MwF6d945yO5";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = client;