const express = require('express');
const Table = require('../models/Table.js');
const Setting = require('../models/Setting');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tables = await Table.find();
        res.json({
            tables: tables,
            count: tables.length,
        });
    } catch (error) {
        res.json({
            message: error
        })
    }
});

router.get('/:tableId', async (req, res) => {
    try {
        const tables = await Table.findById(req.params.tableId);
        res.json({
            tables: tables.id, 
        });
    } catch (error) {
        res.json({
            message: error
        })
    }
});

router.delete('/:tableId', async (req, res) => {
    try {
        await Table.remove({
            _id: req.params.tableId
        })
        res.json({
            message: 'table removed ' 
        });
    } catch (error) {
        res.json({
            message: error
        })
    }
});

router.post('/', async (req, res) => {
    
    const table = new Table({
        name: req.body.name,
    });

    const tables = await Table.find();
    const settings = await Setting.findOne();

    if (tables.length < settings.table_count) {
        try {
            const savedTable = await table.save();
            res.json(savedTable);
        } catch (error) {
            res.json(
                {
                    message: error,
                }
            );
        }

    } else{
        res.json({
            message: 'Sorry, you have reached the max number of tables'
        })
    }
});

module.exports = router;