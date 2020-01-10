'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enemyModel = new Schema({
    name:{
        type: String,
        required: true,
    },
    health:{
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    xPos:{
        type: Number,
        default: 0,
    },
    yPos:{
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('enemyModel', enemyModel);