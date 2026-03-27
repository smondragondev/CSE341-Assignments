const db = require('../models');
const bcrypt = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;
const BSONError = require('mongodb/lib/bson').BSONError;
const User = db.users;
const createError = require('http-errors');
const { adaptBodyToUserSchema } = require('../utils/index')

exports.findAll = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Find all the Users'
    // #swagger.description = 'It retrieves data from the User'
    try {
        const data = await User.find().exec();
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
};

exports.findById = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Find a record by ID'
    // #swagger.description = 'It retrieves data from the User using the ID'
    try {
        const id = req.params.id;
        const userId = new ObjectId(id);
        const filter = {
            '_id': userId,
        };
        const data = await User.findOne(filter);
        if (!data) throw createError.NotFound('User does not exist.');
        res.send(data);
    } catch (err) {
        if (err instanceof BSONError) {
            next(createError.BadRequest('Invalid user id'));
            return
        }
        next(err);
    }

};

exports.create = async (req, res, next) => {
    /* #swagger.tags = ['User']
     #swagger.summary = 'Create a User'
     #swagger.description = 'Create a new a User'
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new User.',
            schema: { $ref: '#/definitions/CreateUpdateUser' }
    } */
    try {
        const userData = adaptBodyToUserSchema(req);
        const hashedPassword = await bcrypt.hashSync(userData.password, 10);
        // TODO: 
        const user = User(
            {
                ...userData,
                password: hashedPassword
            },
        )
        await user.save();
        res.status(201).send();
    } catch (err) {
        next(err);
    }

}

exports.update = async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Update a User'
        #swagger.description = 'Update data from the User'
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Update a new User.',
                schema: { $ref: '#/definitions/CreateUpdateUser' }
    } */
    try {
        const id = req.params.id;
        const userId = new ObjectId(id);
        const filter = { '_id': userId };
        const user = adaptBodyToUserSchema(req);
        const hashedPassword = await bcrypt.hashSync(user.password, 10)
        const updatedUser = {
            ...user,
            password: hashedPassword
        };
        const data = await User.findOneAndUpdate(
            filter,
            updatedUser,
            {
                returnDocument: 'after'
            }
        );
        if (!data) {
            throw createError.NotFound("User Not Found");
        }
        res.status(200).send(data);
    } catch (err) {
        if (err instanceof BSONError) {
            next(createError.BadRequest('Invalid user id'));
            return
        }
        next(err);
    }

}

exports.deleteOne = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = 'Delete a User'
    // #swagger.description = 'Delete a User using the ID'
    try {
        const id = req.params.id;
        const userId = new ObjectId(id);
        const filter = { '_id': userId };
        const data = await User.deleteOne(
            filter,
            userId
        );
        if (data.deletedCount === 0) {
            throw createError.NotFound("User Not Found. Failed to delete.");
        }
        res.status(204).send();
    } catch (err) {
        if (err instanceof BSONError) {
            next(createError.BadRequest('Invalid user id'));
            return
        }
        next(err);
    }
};
