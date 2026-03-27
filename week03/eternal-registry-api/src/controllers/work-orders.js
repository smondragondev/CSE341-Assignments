const db = require('../models');
const { adaptBodyToWorkOrderSchema } = require('../utils');
const ObjectId = require("mongodb").ObjectId;
const BSONError = require("mongodb/lib/bson").BSONError;
const WorkOrder = db.workOrders;
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
    // #swagger.tags = ['Work Orders']
    // #swagger.summary = 'Find all the Work Orders'
    // #swagger.description = 'It retrieves data from the Work Orders'
    try {
        const data = await WorkOrder.find().exec();
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
};

exports.findById = async (req, res, next) => {
    // #swagger.tags = ['Work Orders']
    // #swagger.summary = 'Find a work order by ID'
    // #swagger.description = 'It retrieves data from the Work Orders using the ID'
    try {
        const id = req.params.id;
        const workOrderId = new ObjectId(id);
        const filter = {
            '_id': workOrderId,
        };
        const data = await WorkOrder.findOne(filter);
        if (!data) throw createError.NotFound('Work Order does not exist.');
        res.send(data);
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid work order id'));
            return
        }
        next(err);
    }

};

exports.create = async (req, res, next) => {
    /* #swagger.tags = ['Work Orders']
     #swagger.summary = 'Create a Work Order'
     #swagger.description = 'Create a new a Work Order'
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new Work Order.',
            schema: { $ref: '#/definitions/CreateUpdateWorkOrder' }
    } */
    try {
        const workOrder = WorkOrder(
            adaptBodyToWorkOrderSchema(req),
        )
        await workOrder.save();
        res.status(201).send();
    } catch (err) {
        next(err);
    }

}

exports.update = async (req, res, next) => {
    /*  #swagger.tags = ['Work Orders']
        #swagger.summary = 'Update a Work Order'
        #swagger.description = 'Update data from the Work Order'
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Update a new Work Order.',
                schema: { $ref: '#/definitions/CreateUpdateWorkOrder' }
    } */
    try {
        const id = req.params.id;
        const workOrderId = new ObjectId(id);
        const filter = { '_id': workOrderId };
        const updatedWorkerOrder = adaptBodyToWorkOrderSchema(req);
        const data = await WorkOrder.findOneAndUpdate(
            filter,
            updatedWorkerOrder,
            {
                returnDocument: 'after'
            }
        );
        if (!data) {
            throw createError.NotFound("Work Order Not Found");
        }
        res.status(200).send(data);
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid work order id'));
            return
        }
        next(err);
    }

}

exports.deleteOne = async (req, res, next) => {
    // #swagger.tags = ['Work Orders']
    // #swagger.summary = 'Delete a Work Order'
    // #swagger.description = 'Delete a Work Order using the ID'
    try {
        const id = req.params.id;
        const workOrderId = new ObjectId(id);
        const filter = { '_id': workOrderId };
        const data = await WorkOrder.deleteOne(
            filter,
            workOrderId
        );
        if (data.deletedCount === 0){
            throw createError.NotFound("Work Order Not Found. Failed to delete.");
        }
        res.status(204).send();
    } catch (err) {
        if (err instanceof BSONError){
            next(createError.BadRequest('Invalid work order id'));
            return
        }
        next(err);
    }
};