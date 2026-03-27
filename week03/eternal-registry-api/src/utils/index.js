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

exports.adaptBodyToUserSchema = (req) => {
    return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
}

exports.adaptBodyToWorkOrderSchema = (req) => {
    return {
        type: req.body.type,
        scheduledDate: req.body.scheduledDate,
        status: req.body.status,
        assignedTo: req.body.assignedTo,
    }
}