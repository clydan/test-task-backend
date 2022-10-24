const express = require('express');
const mongoose = require('mongoose');
const tableRouter = require('./routes/tables.js');
const settingRouter = require('./routes/settings.js');
const customerRouter = require('./routes/customer.js');
const adminRouter = require('./routes/admin.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('hello world');
});

app.use('/tables', tableRouter);
app.use('/settings', settingRouter);
app.use('/customers', customerRouter);
app.use('/admin', adminRouter);


try {
    mongoose.connect(
        'mongodb+srv://clydedanso:clydedanso@restuarant.rvclvqp.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log('connected to mongodb')
    );
}
catch(e) {
    console.log("could not connect")
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(5000);