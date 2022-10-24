const { response } = require('express');
const express = require('express');
const Setting = require('../models/Setting');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const setting = await Setting.findOne();
        res.json({
            setting: setting
        });
    } catch (error) {
        res.json({
            message: error
        });
    }
});

router.post('/', async (req, res) => {
    const setting = new Setting({
        table_count: req.body.table_count,
        chair_count: req.body.chair_count,
        max_chairs_on_table: req.body.max_chairs_on_table,

    });

    try {
        const savedSetting = await setting.save();
        res.json({
            setting: savedSetting,
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

router.patch('/', async (req, res) => {
    try {

        const setting = await Setting.findOneAndUpdate({passcode: "password"}, {
            table_count: req.body.table_count,
            chair_count: req.body.chair_count,
            chairs_taken: 0,
            max_chairs_on_table: req.body.max_chairs_on_table,
            passcode: 'password',
        },
        )
        .then(
            function(err, result){

                if(err){
                    res.json({error: err})
                }
                else{
                    res.json({result})
                }
        
            }
        );
        
    } catch (error) {
        res.json({
            message: error.message
        });
    }
});


module.exports = router;