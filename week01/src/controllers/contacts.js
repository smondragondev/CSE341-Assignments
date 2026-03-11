const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contact').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const get = async (req, res) => {
    const id = req.params.id;
    const contactId = new ObjectId(id);
    const result = await mongodb.getDatabase().db().collection('contact').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

const create = async (req, res) => {
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('contact').insertOne(user);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while create the user.');
    }
}

const update = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('contact').replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while update the user.');
    }
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contact').deleteOne({ _id: userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while update the user.');
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    deleteUser,
}