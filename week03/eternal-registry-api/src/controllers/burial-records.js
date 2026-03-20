const db = require('../models');
const { adaptBodyToBurialSchema } = require('../utils');
const ObjectId = require("mongodb").ObjectId;
const BurialRecord = db.burialRecords;

exports.findAll = async (req,res) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Find all the burial records'
    // #swagger.description = 'It retrieves data from the burial records'
    await BurialRecord.find().
    then( (data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while retrieving burial records.'
        })
    });
};

exports.findById = async (req,res) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Find a record by ID'
    // #swagger.description = 'It retrieves data from the burial records using the ID'
    const id = req.params.id;
    const burialId = new ObjectId(id);
    const filter = {
        '_id': burialId,
    }
    await BurialRecord.findOne(filter).
    then( (data) => {
        if (!data) res.status(404).send(data);
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while retrieving burial records.'
        })
    });
};

exports.create = async (req, res) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Create a Burial Record'
    // #swagger.description = 'Create a new a Burial Record'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new Burial Record.',
            schema: { $ref: '#/definitions/CreateAddBurialRecord' }
    } */
    const burialRecord = BurialRecord(
        adaptBodyToBurialSchema(req),
    )
    await burialRecord.save().
    then( (data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while creating burial record.'
        })
    });
}

exports.update = async (req, res) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Update a Burial Record'
    // #swagger.description = 'Update data from the burial record'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a new Burial Record.',
            schema: { $ref: '#/definitions/CreateAddBurialRecord' }
    } */
    const id = req.params.id;
    const burialId = new ObjectId(id);
    const filter = {'_id':burialId};
    const updatedBurial = adaptBodyToBurialSchema(req);
    await BurialRecord.findOneAndUpdate(
        filter,
        updatedBurial,
        {
            returnDocument: 'after'
        }
    ).then(
        (data) => {
            res.status(200).send(data);
        }
    ).catch(
        (err) => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while updating burial record.'
            })
        }
    )
}

exports.deleteOne = async (req, res) => {
    // #swagger.tags = ['Burial Records']
    // #swagger.summary = 'Delete a Burial Record'
    // #swagger.description = 'Delete a Burial Record using the ID'
    const id = req.params.id;
    const burialId = new ObjectId(id);
    const filter = {'_id':burialId};
    await BurialRecord.deleteOne(
        filter,
        burialId
    ).then(
        (data) => {
            res.status(204).send(data);
        }
    ).catch(
        (err) => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while updating burial record.'
            })
        }
    )
};