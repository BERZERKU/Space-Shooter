'use strict';

module.exports = function(app){
    var player = require("../controllers/playerController")

    //Player Routes
    app.route('/register').post(player.register);

    app.route('/login').post(player.login);

    app.route('/players').get(player.get_all_players);
}