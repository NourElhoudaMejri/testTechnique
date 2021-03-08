const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/user');
require('dotenv').config()


// Registration
exports.signup = passport.authenticate('signup', {
    session: false
}), async (req, res, next) => {
    console.log(req.user+"***")  
      res.json({
        message: 'Signup successful',
        user: req.user
    });
}



// Local Login
exports.login = async (req, res, next) => {
    console.log(req.user)
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = 'Bad Credentials'; // new Error()
              return  res.json(error)
         
              
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error)

              
                const body = {
                    _id: user._id,
                    email: user.email
                };
        
                const token = jwt.sign({
                    user: body
                }, process.env.PASSPORT_SECRET);
             
                user.password = null;               
               
                return res.json({
                    token,
                    user
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}


exports.profile = (req, res, next) => {
    console.log( req.query)
     return res.json({
         message: 'You made it to the secure route',
         user: req.user,
         token: req.query.token
     })
 }

exports.updateUser= (req,res,next)=>
{
    UserModel.findOneAndUpdate({_id:req.body._id},{
        username:req.body.username,
        email:req.body.email,
        role:req.body.role,
    }).then((err,user) => {
      
      res.json({success: true, msg: "Updated"});
    });
}





exports.getAllUsers=(req,res,next)=>{

    UserModel.find({}, (err, users)=>{
         
     res.json({success: true, users })
      });
       
}

exports.deleteUser=  (req, res, next) => {
  
 
    UserModel.remove({_id:req.body.id},(err) =>{
     if(err) {
       res.json({success: false, msg: "Erreur lors de la suppression"});
     } else {
       res.json({success: true, msg: "supprime"});
     }
  });

};
   


exports.verifyPassowrd= (req,res)=>
{ 
    if(req.body.username){
        UserModel.findOne({
            username : req.body.username
        }).then(user => {
            if(user){
                 
               
                bcrypt.compare(req.body.password, user.password)
                .then(validatedPassword => {
                 if(validatedPassword == true)
                res.status(200).send({message : 'password validated'})
                
                 else
                 res.status(200).send({message : 'password unvalidated'})
                })
            }else {
                
                res.status(404).json('no user exists to update')
            }
        })
    } else res.status(400).json('username is mandatory')

}
