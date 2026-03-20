const db = require('../models');
const BurialRecord = db.burialRecords;

exports.findAll = async (req,res) =>{
    await BurialRecord.find(
        {},
    ).
    select({
        deceased: 1,
        location: 1
    }).then( (data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error ocurred while retrieving '
        })
    })
}