const jwt = require("jsonwebtoken");
const player = require("../models/playerModel");

exports.authenticate = function(request, response, next) {
  try {
    const headerData = request.header("Authorization");
    if (!headerData) {
      throw new Error("No authorization provided. Expecting bearer token!");
    }
    const token = headerData.replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const retrievedPlayer = player.findOne({
      name: data.name,
      "tokens.token": token
    });
    if (!retrievedPlayer) {
      throw new Error();
    }
    next();
  } catch (error) {
    response
      .status(401)
      .send({
        error: "Not authorized to access this resource",
        message: error.message
      });
  }
};
