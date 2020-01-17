"use strict";

var mongoose = require("mongoose"),
  enemyModel = mongoose.model("enemyModel");

exports.spawn = function(req, res) {
  var newEnemy = new enemyModel(req.body);
  console.dir(newEnemy);
  newEnemy.save(function(err, enemy) {
    if (err) {
      res.send(err);
    } else {
      res.json(enemy);
    }
  });
};

exports.get_all_enemies = function(req, res) {
  enemyModel.find({}, function(err, enemies) {
    if (err) {
      res.send(err);
      console.log("Error from the Database");
    } else {
      res.json(enemies);
    }
  });
};

exports.get_by_name = function(req, res) {
  enemyModel.findOne({ name: req.params.name }, function(err, enemy) {
    if (err) {
      res.send(err);
    } else if (enemy === null) {
      res.send("Enemy not found!");
      console.log(enemy.name);
    } else {
      console.log("Found " + enemy.name);
      res.send("Found " + enemy.name);
    }
  });
};

exports.get_by_id = function(req, res) {
  enemyModel.findById({_id: req.params.id}, function(err, enemy) {
    if (err) {
      res.send(err);
    } else if (enemy === null) {
      console.log(enemy.name);
      res.send("Enemy not found!");
    } else {
      console.log("Found " + enemy.name);
      res.send(enemy);
    }
  });
};

exports.update_by_id = function(req, res) {
  //find enemy
  enemyModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function(err, enemy) {//req.body.id?
    if (err) {
      res.send(err);
    } else if (enemy === null) {
      res.send("Enemy not found!");
      console.log(enemy.name);
    } else {
      console.log("Updated " + enemy);
      res.send("Updated " + enemy.name);
    }
  });
};

exports.delete_by_id = function(req, res) {
  try{
    enemyModel.findByIdAndDelete({_id: req.params.id}, function(err, enemy){
      console.log("Deleted " + enemy);
      res.send("deleted" + enemy.name)
    });
    
  }  catch(err){
    console.log(err);
  }
  
  
};