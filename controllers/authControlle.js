const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){

    const token = req.headers['x-access-token']
    console.log(token)
    if(!token) return res.status(401).send('Access Denied')
    
    

    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()
    }catch(error){res.status(401).send('Access Denied');}
    
    
}