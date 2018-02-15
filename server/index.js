var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var router = express.Router();
var geolib = require('geolib');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({ 
    
        "type": "SMTP",
        "host": "smtp.gmail.com",
        "secure": true,
        "port": 465,
        "auth": {
          "user": "eatenoughusa@gmail.com",
          "pass": "Eatenough#1330"
        }
      
});

var morgan      = require('morgan');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./models/user'); // get the mongoose model
var port        = process.env.PORT || 3000;
var jwt         = require('jwt-simple');

var RestaurantSchema = require('./models/Restaurant'); 
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

var MenuSchema = require('./models/menu'); 
var Menu = mongoose.model('menu', MenuSchema);

var MenuCourseSchema = require('./models/MenuCourse'); 
var MenuCourse = mongoose.model('menucourse', MenuSchema);
// Create application
 var app = express();

 // Add Middleware necessary for Rest API's
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());
 app.use(methodOverride('X-HTTP-Method-Override'));

 app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
  

});



app.get('/test', function(req, res) {
  var distance = geolib.getDistance(
    {latitude: 37.912808, longitude: -122.306239},
    {latitude: 37.890170, longitude: -122.297409}
);

  Restaurant.find(
                  { loc: 
                    { $geoWithin: 
                      { $centerSphere: 
                        [ [ -122.139602,37.731315] ,50 / 3963.2 ] 
                      } 
                    } 
                  }, 
                  function(err,result){
                                        if(err) throw err;
                                        else  { 
                                                res.send({result});
                                               }
                                      }
                            );

  // var mile = geolib.convertUnit('mi', distance, 2);
  // Restaurant.find( '' , function(err, result) {
      

  //  if (err) {return handleError(err);}
  //  else{

  //   res.send({result});
  //   }
  // });

  // res.send({resulted});
});

app.post('/mapprocess', function(req, res) {


  var state = req.body.state;
 var addr = req.body.addr;
  // var city = req.body.city;
console.log(state);
console.log(addr);
if(addr && state){
Restaurant.findOne(
                 {state:{$regex : state  }}, 
                  function(err,result){
                                        if(err) throw err;
                                        else  { 
                                                res.send({result});
                                                console.log(result);
                                               }
                                      }
                            );
}
else{
  res.send({sucess:false});
}
 
});


 // CORS support
 app.use(function(req,res,next){
 	res.header('Access-Control-Allow-Origin','*');
 	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
 	res.header('Access-Control-Allow-Headers', 'Content-Type');
 	next();
 });


// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();




 
// create a new user account (POST http://localhost:8080/api/signup)
app.post('/signup', function(req, res) {
  if (!req.body.fname || !req.body.lname || !req.body.password || !req.body.email || !req.body.phone) {
    res.json({success: false, msg: 'Please pass firstname, lastname, password and email address.'});
  } 
  else {

      var newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
      phone:req.body.phone,
      email: req.body.email
      });

      User.findOne({
      phone: req.body.phone
      }, function(err, phone)
          {
            if (err) throw err;
            if (phone) 
            {
              return res.status(403).send({success: false, msg: 'Phone number already exist'});
            } 
            else 
            {
              User.findOne({ email: req.body.email},function(err,email){
                if(err) throw err;
                if(email)
                {
                  return res.status(403).send({sucess:false,msg:'Email address already exist'});
                }
                else
                {
                  newUser.save(function(err) {
                  if (err) 
                  {
                    console.log(err);
                    return res.json({success: false, msg: err});
                  }
                  // setup e-mail data with unicode symbols
                  var mailOptions = {
                      from: '"Eat Enough" <eatenoughusa@gmail.com>', // sender address
                      to: req.body.email, // list of receivers
                      subject: 'Registration', // Subject line
                      text: 'Thank You for regestering with EatEnough. From Now we will be sending you with our sepecial food offers around you area. ', // plaintext body
                      html: '<b>Regards, EatEnough Team</b>' // html body
                  };
                   // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });
                    res.json({success: true, msg: 'Successful created new user.'});
                  });
                }
              });
            }
          });

        // save the user
  
      }
    });

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, email) {
    if (err) throw err;
 
    if (!email) {
      res.send({success: false, msg: 'Authentication failed. Email not found.'});
    } else {
      // check if password matches
      email.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(email, config.secret);
          // return the information including token as JSON
          var result = [{success: true, token: 'JWT ' + token, variables:email}];
          res.send({result});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
 
// connect the api routes under /api/*
app.use('/api', apiRoutes);




 	app.models= require('./models/index');

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)


   




  // route to porcess restaurant list according to address recieved
app.post('/restaurant', function(req, res) {
    var lat = req.body.lat;
  var lng = req.body.lng;
 
  // var city = req.body.city;
console.log(lat);
console.log(lng);
if(lat && lng){
Restaurant.find(
                  { loc: 
                    { $geoWithin: 
                      { $centerSphere: 
                        [ [ lng, lat] , 4/ 3963.2 ] 
                      } 
                    } 
                  }, 
                  function(err,result){
                                        if(err) throw err;
                                        else  { 
                                                res.send({result});

                                               }
                                      }
                            );
}
else{
  res.send({sucess:false});
}
   

});

app.post('/restaurantdetails', function(req, res) {
// var restaurantName=req.body.restaurantName;
var restaurantName="Creasian Taste of the Himalayas";

console.log(restaurantName);
if(restaurantName ){
 Menu.find({restaurantName: {$regex: new RegExp('^' + restaurantName.toLowerCase(), 'i')}},
                  function(err,result){
                                        if(err) throw err;
                                        else  { 
                                                res.send({result});
                                                console.log(result);
                                               }
                                      }
                            );
}
});

app.post('/restaurantcourse', function(req, res) {
// var restaurantName=req.body.restaurantName;
var restaurantName="Creasian Taste of the Himalayas";
console.log(restaurantName);
if(restaurantName){
 MenuCourse.find({restaurantName: {$regex: new RegExp('^' + restaurantName.toLowerCase(), 'i')}}, 
                  function(err,result){
                                        if(err) throw err;
                                        else  { 
                                                res.send({result});
                                                console.log(result);
                                               }
                                      }
                            );
}
});
// app.delete('/restaurantdetails', function(req, res) {
// var id=req.body.id;
// console.log(id);

//  Menu.remove({id: id},function(err,result){
//   if(err) throw err;
//   else{
//     res.send({result});
//     console.log(result);  }
//  }); 
                  
// });



app.models= require('./models/index');

 	// Load the routes
 	var routes = require('./routes');
 	_.each(routes, function(controller, route){
 		app.use(route, controller(app,route));
 	});


console.log('Listening on port 3000...');
	app.listen(port);

 // Connect to MongoDb 
//  mongoose.connect('mongodb://localhost/test');
//  var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// // Load the models.
//  	app.models= require('./models/index')

//  	// Load the routes
//  	var routes = require('./routes');
//  	_.each(routes, function(controller, route){
//  		app.use(route, controller(app,route));
//  	});

//  	console.log('Listening on port 3000...');
//  	app.listen(port);
// });


