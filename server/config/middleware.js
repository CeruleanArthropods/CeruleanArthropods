var morgan = require('morgan');
var bodyParser = require('body-parser');
var stripe = require("stripe")("pk_test_ryKUfWb7sBDEmXyCjfDHfUgy");

module.exports = function (app, express) {

  var patientRouter = express.Router();
  var donationRouter = express.Router();
  var conditionRouter = express.Router();
  var userRouter = express.Router();
  
  app.use('/classes/patients', patientRouter);
  require('../patients/patientRoutes')(patientRouter)

//Serve up static files in client folder and other middleware
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

//Routes traffic to their router and injects the router into its route file

  app.use('/classes/donations', donationRouter);
  require('../donations/donationRoutes')(donationRouter);

  app.use('/classes/conditions', conditionRouter);
  require('../conditions/conditionRoutes')(conditionRouter);

  app.use('/classes/users', userRouter);

  require('../users/userRoutes')(userRouter);

}
