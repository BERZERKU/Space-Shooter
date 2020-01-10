'use strict'

module.exports = function(app){
    var enemy = require("../controllers/enemyController");
    var auth = require("../middleware/tokenAuthenticator");

    app.route('/enemies').get(enemy.get_all_enemies);
}