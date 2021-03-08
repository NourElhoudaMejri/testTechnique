const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema ({
  role: {
    type: String,
  enum: ["client", "Admin"]
   
  },

  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
    

});


UserSchema.pre('save', async function (next) {
    // 'this' refers to the current document about to be saved
    const user = this;

    if(user)
    {
        // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
        // your application becomes.
        const hash = await bcrypt.hash(this.password, 10);
        // Replace the plain text password with the hash and then store it
        this.password = hash;
        // Indicates we're done and moves on to the next middleware
    }
    
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}



const UserModel = module.exports = mongoose.model('User', UserSchema);



module.exports = UserModel;






