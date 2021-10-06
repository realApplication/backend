'use strict';

const { superSchema } = require('../models/index');

const getRoom = async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        let allRecords = await superSchema.findAll();
        console.log('allRecords' ,allRecords );
        res.status(200).json(allRecords);
    } else {
        let allRecords = await superSchema.findOne({ where: { id: id } });
        console.log(allRecords);
        res.status(200).json(allRecords);
    }

}

const addRoom = async (req, res) => {
    try {
        let newRoom = req.body;
        let room = await superSchema.create(newRoom)
        res.status(200).json(room);
    }
    catch (err) {
        console.log(err);
    }
}

const deleteRoom = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let deleteRoom = await superSchema.destroy({ where: { id: id } });
        res.status(200).json("item deleted");

    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getRoom,
    addRoom,
    deleteRoom

}