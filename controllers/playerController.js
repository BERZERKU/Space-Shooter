"use strict";
const crypto = require("crypto");

var mongoose = require("mongoose"),
  playerModel = mongoose.model("playerModel");

exports.get_all_players = function(req, res) {
  playerModel.find({}, function(err, players) {
    if (err) {
      res.send(err);
      console.log("");
    } else {
      res.json(players);
    }
  });
};

exports.register = function(req, res) {
  var newPlayer = new playerModel(req.body);
  console.dir(newPlayer);
  newPlayer.setPassword(req.body.password);
  newPlayer.save(function(err, player) {
    if (err) {
      res.send(err);
    } else {
      res.json(player);
    }
  });
};

exports.login = function(req, res) {
  playerModel.findOne({ name: req.body.name }, function(err, player) {
    if (err) {
      res.send(err);
    } else if (player === null || !player.validatePassword(req.body.password)) {
      res.send("Authentication failed!");
      console.log(player.name);
      console.log(player.password);
    } else {
      console.log("Login successful for " + player.name);
      var token = player.generateAuthToken();
      res.json({ token: token });
    }
  });
};
