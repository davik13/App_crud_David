const mongoose = require('mongoose')

const UserSchema =  mongoose.Schema({
    firstName: String,
    lastName: String,
    userName:  String,
    civilite: String,
    mail:  String,
    phone: String,
    img: String,
    role: String,
    is_ative: { type: Boolean, default: false},
    is_verify: { type: Boolean, default: false},
    is_deleted: { type: Boolean, default: false}
}, {timestamps: true})


module.exports = mongoose.model('User', UserSchema);