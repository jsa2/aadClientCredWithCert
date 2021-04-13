// Used to create config, otherwise manually fill nodeconfig.json

const {generateConfig} =require('./helpers/configGenerator')

var appid = '010ef950-c02b-47d8-87a1-cbc6de2145b9'
var tenantId = '46d2c4e6-a732-4fb4-b9f8-374af03f3f58'


//Generate Configuration
generateConfig(appid,tenantId,'MyTempPasswordaslöjsdalksjd')
.then((config) => console.log(config))
.catch((error) => console.log(error))
