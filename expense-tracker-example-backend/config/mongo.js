const mongoose = require('mongoose');
const dbName = process.env.MONGO_DB || 'expenseTrackerExample';
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('mongoose is online')
});