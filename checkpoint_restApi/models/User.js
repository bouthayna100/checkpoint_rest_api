   //  7. Create a models folder and a User.js file in it

//     8. In User.js you must define a mongoose Schema 
let mongoose = require( 'mongoose' )

const UserSchema = new mongoose.Schema( {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      age: { type: Number },
      phonenumber: { type: Number },
      job: { type: String},
} );
//and export the model , you will use it in the server.js
module.exports = mongoose.model( 'User', UserSchema )
