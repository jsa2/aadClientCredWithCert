

const {exec} = require('child_process');
const fs =require('fs')

function execPromise (command) {

    return new Promise ( (resolve,reject) => {

        exec(command, (err,stdout) => {

            if (err) {
                return reject(err)
            }

            resolve (stdout)
    
        })

    })

   
}

function x5tf (key) {

    return new Promise ((resolve) => {

        /* var sig */
    exec(`openssl x509 -in ${key} -fingerprint -noout`, (error,stdout) => {

        if(error) {
            return reject(error)
        }

    var shaSig = stdout.replace('SHA1 Fingerprint=','')
    //console.log(shaSig)
    // code below from https://redthunder.blog/2017/06/08/jwts-jwks-kids-x5ts-oh-my/
    var sigOctets = shaSig.split(":");
    var sigBuffer = Buffer.alloc(sigOctets.length)
    for(var i=0; i<sigOctets.length; i++){
       sigBuffer.writeUInt8(parseInt(sigOctets[i], 16), i);
    }
    //Perform base64url-encoding as per RFC7515 Appendix C
    // code 
    var x5t = sigBuffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    return resolve(x5t)

    
    
    })

    })

}


 async function generateConfig (appid,tenantId) {

    var cmd = [
        'openssl genrsa -out private1.pem 2048',
        'openssl req -new -x509 -key private1.pem -out public1.pem -days 720 -config ca.cnf -subj "/C=FI/CN=AADCert"'
        ]

    try {
        for (let index = 0; index < cmd.length; index++) {

            await execPromise(cmd[index]).catch((error) => {
               
                return Promise.reject(error)
            })
        }

    } catch (error) {
        return Promise.reject(error)
    }

    var x5t = await x5tf('public1.pem').catch((error) => {
        return Promise.reject(error)
    })

    var config = {
        "priv":  ".\\private1.pem",
        "pub":  ".\\public1.pem",
        appid,
        tenantId,
        x5t,
        "url":`https://login.microsoftonline.com/${tenantId}/oauth2/token`
    }
    
    fs.writeFileSync('nodeConfig.json', JSON.stringify(config))

    return('config file created at \\nodeconfig.json')
   
 }


module.exports={generateConfig}


