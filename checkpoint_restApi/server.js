const express = require( 'express' );
const app = express();
app.use( express.json() );
let mongoose = require( 'mongoose' );
//Configure the environment variables with .env
require( 'dotenv' ).config({ path:'config/.env'});
mongoose.set( 'useFindAndModify', false );
mongoose.set( 'useCreateIndex', true );
let UserModel = require( './models/User' )

//10. In the server.js create four routes:
//GET: RETURN ALL USERS
app.get( '/all-users', ( req, res ) => {
    UserModel.find().then( ( data ) => {
        res.status( 200 ).json( { msg: "Success request: all-users", data } );
    } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//POST: ADD A NEW USER TO THE DATABASE
app.post( '/user', ( req, res ) => {
    const { firstname,lastname, age, numberphone, job } = req.body;
    const user = new UserModel( {
        firstname,
        lastname,
        age,
        numberphone,
        job
    } )
    user.save()
        .then( ( data ) => {
            res.status( 200 ).json( {msg:"Success request: user" , data} );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//PUT: EDIT A USER BY ID
app.put( '/modify-user/:id', ( req, res ) => {
    const userId = req.params.id
    UserModel.findByIdAndUpdate( userId, req.body )
        .then( ( data ) => {
            res.status( 200 ).json( { msg: "Success request: modify-user", data } );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )
//DELETE: REMOVE A USER BY ID

app.delete( '/delete-user/:id', ( req, res ) => {
    const userId = req.params.id
    UserModel.findByIdAndRemove( { _id: userId } )
        .then( ( data ) => {
            res.status( 200 ).json( { msg: "Success request: delete-user", data } );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//Connect your database locally or with mongo atlas
 mongoose.connect( process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => {
      console.log( 'Database connection successful' )
    } )
    .catch( err => {
      console.error( 'Error connecting to the database.'+ err );
    } )

//Lunch a server with express in the server.js file
app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('server is running on port 3000');
});
