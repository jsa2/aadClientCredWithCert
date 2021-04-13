// Used to create config, otherwise manually fill nodeconfig.json

const {generateConfig} =require('./helpers/configGenerator')

var appid = '784b0133-29b4-4d65-8168-f15477c4620b'
var tenantId = '3d6e366f-9587-413b-ab6b-0a851b1b91ba'


//Generate Configuration
generateConfig(appid,tenantId)
.then((config) => console.log(config))
.catch((error) => console.log(error))
