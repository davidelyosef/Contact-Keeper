const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected Successfuly to MongoDB.')
    }
    catch (err) {
        console.error('Error: ' + err.message);
    }
}

module.exports =
    connectDB