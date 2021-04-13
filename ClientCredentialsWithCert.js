
// GetSHA1 gets the thumbprint for public key to be used 
const {getSHA1} = require('./helpers/configGenerator')

const {getAADtokenWithCert, createToken} = require('./src/getAADtokenWithCert')

var config = require('./nodeconfig.json')

// Destructure config for reading Public and Private Key's
var {
    pub,
    priv
} = config

//
var pub = require('fs').readFileSync('./public1.pem').toString()
var priv = require('fs').readFileSync('./private1.pem').toString()

//Wrap into async function 

async function getToken() {

     var jwt = await createToken(config,pub,priv).catch((error) => {
        return error
      }
    )

    console.log('token',jwt)

    var AADtoken = await getAADtokenWithCert(config,jwt).catch((error) => {
        return error
    })


   return AADtoken

}



getToken().then((data) => {

    console.log('AAD Response:',data)
})

