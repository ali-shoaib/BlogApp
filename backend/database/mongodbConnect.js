const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbconnect = async () => {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('database connected.'))
    .catch(err=>console.log(err));

    // try{
    //     const db = await mongoose.connect(MONGO_URI);
    //     console.log(`Database connected to host: ${db.connection.host}`);
    // }
    // catch(er){
    //     console.log(`Error: ${er}`);
    // }
}

module.exports = dbconnect;