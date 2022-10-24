const express = require('express');
const Table = require('../models/Table.js');
const Setting = require('../models/Setting');

const router = express.Router();

router.get('/reset', async (req, res) => {
    const setting = await Setting.findOne();
    const tables = await Table.find();
    try {
        const setting = await Setting.findOneAndUpdate({passcode: "password"}, {
            table_count: 0,
            chair_count: 0,
            chairs_taken: 0,
            max_chairs_on_table: 0,
            passcode: 'password',
        },
        )
        .then(
            function(err, result){

                if(err){
                    res.send(err)
                }
                else{
                    res.send(result)
                }
        
            }
        );

        // if (Table.listCollections().toArray().includes(collection)) {
        //     await Table.collection(collection).drop();
        // }

    } catch (error) {
        res.json({
            message: error.message
        })
    }
});

module.exports = router