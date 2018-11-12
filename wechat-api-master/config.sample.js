// config
// - `url` 约定了微信POST过来的接口地址，如果你在微信填的是 `http://yoursite.com/abc` 那么这里就应该填写 `/abc`。
// - `token` 填入你的weixin token `(String)`
// - `autoRefresh` 是否开启自动刷新 `(true | false)`，默认`true`
// - `delay` 自动刷新的时间 `(Number)`，默认为 2（表示2分钟）

module.exports = {
    port: 3000,
    corpid: '',
    secret: '',
    agentid: '',
    token: '',
    encodingAESKey: '',
    corpId: '',                                 // 同corpid
    reply:[{                                    // 注册企业号收到消息后的回调接口
        method: '',
        host: '',
        port: 3000,
        path: '',
        headers: {
            "Content-Type": 'application/json'
        }
    }]
}