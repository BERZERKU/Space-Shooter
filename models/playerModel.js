'use strict'
const crypto = require('crypto');


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken');

var playerModel = new Schema({
    name:{
        type: String,
        required: true,
        index: {unique: true}
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
});



playerModel.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(32).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

playerModel.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

playerModel.methods.generateAuthToken = function() {
    const player = this;
    const token = jwt.sign({name: player.name}, process.env.JWT_KEY);
    player.tokens = player.tokens.concat({token});
    player.save();
    return token;
};
   
module.exports = mongoose.model('playerModel', playerModel);