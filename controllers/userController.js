const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {loginValidade, registerValidade} = require('./validade')

const userController = {
    register: async function(req, res){

        const {error} = registerValidade(req.body)
        if(error){return res.status(400).send(error.message)}


        const selecteduser = await User.findOne({email: req.body.email})
        if(selecteduser) return res.status(400).send("Email exssist")

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:bcrypt.hashSync(req.body.password),
        })

        try{
            const savedUser = await user.save()
            res.send(savedUser)
        } catch(error){
            res.status(400).send(error)
        }
    },
    login: async function(req, res){

        const {error} = loginValidade(req.body)
        if(error){return res.status(400).send(error.message)}

        const selecteduser = await User.findOne({email: req.body.email})
        if(!selecteduser) return res.status(400).send("Email or password incorrect")

        const passAnduserMatch = bcrypt.compareSync(req.body.password, selecteduser.password)
        if(!passAnduserMatch) return res.status(400).send("Email or password incorrect")

        const token = jwt.sign({_id:selecteduser._id, admin:selecteduser.admin},process.env.TOKEN_SECRET)

        res.header('authoriztion-token', token)
        res.send("User logged")
    },
}



module.exports = userController