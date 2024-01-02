const mongoose = require('mongoose');

const connect = () => {
    try {
        mongoose.connect("mongodb+srv://thakurajul1022:jZ5A7AVjcmB0D80t@cluster0.mgfv1bu.mongodb.net/");

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('database connected successfully');
        })

        connection.on('error', (error) => {
            console.log('please make sure your database is running fine!' + error);
            process.exit();
        })

    } catch (error) {
        console.log('connection error' + error.message);
    }

}

module.exports = connect;