exports.adaptBodyToBurialSchema = (req) => {
    const deceased = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        intermentDate: req.body.intermentDate
    };
    const location = {
        cemeteryName: req.body.cemeteryName,
        section: req.body.section,
        block: req.body.block,
        lotNumber: req.body.lotNumber,
        graveNumber: req.body.graveNumber,
        coordinates: {
            lat: req.body.lat,
            lng: req.body.lng
        }
    }
    return {
        deceased,
        location,
    }
}