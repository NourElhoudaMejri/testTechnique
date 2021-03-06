const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
// We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

// Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        // Find the user associated with the username provided by the user
   
        const existUser = await UserModel.findOne({
            email: req.body.email
        });

        if (existUser) {
            // If the user is found in the database, return a message
            return done(null, false, {
                message: 'User with provided username already exists'
            });
        }

        // Save the information provided by the user to the the database
        const user = await UserModel.create({
            username: req.body.username,
            email ,
            password ,
           
          
        });
     
        // Send the user information to the next middleware
        return done(null, user, {
            message: 'User created Successfully'
        });
       
    } catch (error) {
        return done(error);
    }
}));

// Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Find the user associated with the email provided by the user
        const user = await UserModel.findOne({
            email
        });
        if (!user) {
            // If the user isn't found in the database, return a message
            return done(null, false, {
                message: 'User not found'
            });
        }
        // Validate password and make sure it matches with the corresponding hash stored in the database
        // If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }
        // Send the user information to the next middleware
        return done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        return done(error);
    }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
 
    // Secret we used to sign our JWT
    secretOrKey: process.env.PASSPORT_SECRET,
    // We expect the user to send the token as a query parameter with the name 'token'
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
  
  //  jwtFromRequest: ExtractJWT.fromUrlQueryParameter(process.env.SECRET_TOKEN)
},(jwtPayload, done)=> {

    console.log(jwtPayload.user._id);
            return UserModel.findById({
                _id : jwtPayload.user._id
            }).then((user,err)=>
                {
                   
                if (err)
                {
                        return done(err, false);
                }
                if (user) {
                  
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }
    
 
));