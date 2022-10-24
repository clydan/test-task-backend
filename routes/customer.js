const express = require('express');
const Table = require('../models/Table.js');
const Setting = require('../models/Setting');

const router = express.Router();


router.post('/', async (req, res) => {
    const totalHeadCount = req.body.number_of_customers
    const setting = await Setting.findOne();
    const unavailableTables = (await Table.find({is_occupied:true})).length

    const availableChairs = (setting.chair_count) - (unavailableTables * setting.max_chairs_on_table);
    
    console.log((availableChairs - totalHeadCount) >= setting.max_chairs_on_table);

    if((availableChairs - totalHeadCount) >= setting.max_chairs_on_table){
            let requestedTables = Math.ceil(totalHeadCount/setting.max_chairs_on_table);

            const availableTables = await Table.find({
                is_occupied: false
            }).limit(requestedTables);

            for(const table of availableTables) {
                table.overwrite({
                    name: table.name,
                    is_occupied: true
                });

                await table.save();
            }

            res.json({
                availableTables: availableTables
            });
    } else{
        res.json({
            message: 'sorry, no available tale for your group. thank you'
        });
    }
});

module.exports = router;