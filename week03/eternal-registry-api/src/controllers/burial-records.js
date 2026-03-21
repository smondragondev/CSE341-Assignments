const db = require('../models');
const { adaptBodyToBurialSchema } = require('../utils');
const ObjectId = require("mongodb").ObjectId;
const BSONError = require("mongodb/lib/bson").BSONError;
const BurialRecord = db.burialRecords;
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.findAll = async (req, res, next) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Find all the burial records'
    // #swagger.description = 'It retrieves data from the burial records'
    try {
        const data = await BurialRecord.find().exec();
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
};

exports.findById = async (req, res, next) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Find a record by ID'
    // #swagger.description = 'It retrieves data from the burial records using the ID'
    try {
        const id = req.params.id;
        const burialId = new ObjectId(id);
        const filter = {
            '_id': burialId,
        };
        const data = await BurialRecord.findOne(filter);
        if (!data) throw createError.NotFound('Burial Record does not exist.');
        res.send(data);
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid burial id'));
            return
        }
        next(err);
    }

};

exports.create = async (req, res, next) => {
    /* #swagger.tags = ['Burial Records']
     #swagger.summary = 'Create a Burial Record'
     #swagger.description = 'Create a new a Burial Record'
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new Burial Record.',
            schema: { $ref: '#/definitions/CreateAddBurialRecord' }
    } */
    try {
        const burialRecord = BurialRecord(
            adaptBodyToBurialSchema(req),
        )
        await burialRecord.save();
        res.status(201).send();
    } catch (err) {
        next(err);
    }

}

exports.update = async (req, res, next) => {
    /*  #swagger.tags = ['Burial Records']
        #swagger.summary = 'Update a Burial Record'
        #swagger.description = 'Update data from the burial record'
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Update a new Burial Record.',
                schema: { $ref: '#/definitions/CreateAddBurialRecord' }
    } */
    try {
        const id = req.params.id;
        const burialId = new ObjectId(id);
        const filter = { '_id': burialId };
        const updatedBurial = adaptBodyToBurialSchema(req);
        const data = await BurialRecord.findOneAndUpdate(
            filter,
            updatedBurial,
            {
                returnDocument: 'after'
            }
        );
        if (!data) {
            throw createError.NotFound("Burial Record Not Found");
        }
        res.status(200).send(data);
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid burial id'));
            return
        }
        next(err);
    }

}

exports.deleteOne = async (req, res, next) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Delete a Burial Record'
    // #swagger.description = 'Delete a Burial Record using the ID'
    try {
        const id = req.params.id;
        const burialId = new ObjectId(id);
        const filter = { '_id': burialId };
        const data = await BurialRecord.deleteOne(
            filter,
            burialId
        );
        if (data.deletedCount === 0){
            throw createError.NotFound("Burial Record Not Found. Failed to delete.");
        }
        res.status(204).send();
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid burial id'));
            return
        }
        next(err);
    }
};