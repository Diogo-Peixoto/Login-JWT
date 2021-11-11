const express = require('express')
const router = express.Router()
const auth = require('../controllers/authControlle')

router.get('/', auth, (req,res)=>{

    if(req.user.admin){
        res.send('Esse ddado so deve ser visto pelo ADMIN')
    }else{
        res.status(401).send('Not Admin: Access Denied')
    }
}) 

module.exports = router