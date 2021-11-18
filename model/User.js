const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type: String, required:true, minlegth:3, maxlegth:50},
    email:{type: String, required:true, minlegth:6, maxlegth:100},
    password:{type: String, required:true, minlegth:6, maxlegth:200},
    createdAt:{type: Date, default: Date.now},
    admin:{type: Boolean, default: false}
})

module.exports = mongoose.model('User',userSchema)