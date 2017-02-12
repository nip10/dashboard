const sequelize = require('sequelize');
// in your server file - e.g. app.js
//var Project = sequelize.import(__dirname + "/path/to/models/project")

// The model definition is done in /path/to/models/project.js
// As you might notice, the DataTypes are the very same as explained above
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
}
