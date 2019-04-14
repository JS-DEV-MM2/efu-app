'use strict';

const express = require('express');
const Joi = require('joi');
const passport = require('passport');
//const {User} = require('../models/user.model');
const {Course} = require('../models/course.model');

const {jwtAuth} = require('../auth/auth.strategies');
const {Deliverable} = require('../models/deliverable.model');

const deliverableRouter = express.Router();
deliverableRouter.use('/', passport.authenticate('jwt', {session: false}));


// add a new deliverable
deliverableRouter.post('/', (req, res) => {
    console.log('did i make it past the first line?');

    const newDeliverable = {
            course: req.course.id,
            deliverable_name: req.body.deliverable_name,
            //pressure: req.body.pressure,
            //desc: req.body.desc,
            //prephrs: req.body.prephrs
    };
    console.log('this is the new delicerable', newDeliverable);

/*
    const validation = Joi.validate(newDeliverable, DeliverableJoiSchema);
    if (validation.error){
        return res.status(400).json({error: validation.error});
    }
    */
   Course.findOne({course_name: req.course.course_name})
    .then(course => {
        console.log('course name is ', course_name);
        newDeliverable.course = course._id;
        Deliverable.create(newDeliverable)
        .then(deliverable => {
            console.log('deliverable is ', deliverable);
            return res.status(201).json(deliverable.serialize(course));
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong!'});
        });

    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'somethen else went wrong'});
    });
    
});
/*
// get all deliverables for selected user
deliverableRouter.get('/:course_name/deliverables', (req, res) => {
    Course.find({ course_name: req.params.course_name})
        .then(deliverables => {
            res.status(200).json(deliverables.map(deliverable => deliverable.serialize()))
        });
});


// get all deliverables
deliverableRouter.get('/', (req, res) => {
    Deliverable.find()
        .sort({ type: -1} )
        .then( deliverables => {
            return res.status(200)
                .json(deliverables.map(deliverable => deliverable.serialize())
                );
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'something went wrong!' });
        });
});
/*
// retrieve one deliverable by type
deliverableRouter.get('/:pressure', (req, res) => {
    console.log(req.params.pressure);
    Deliverable.find({"pressure": req.params.pressure})
        .then(deliverables => {
            return res.json(deliverables.map(deliverable => deliverable.serialize()));
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'something went wrong!' });
        });
});

// update deliverable by id
deliverableRouter.put('/:id', (req, res) => {

    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        return res.status(400).json({ error: 'Request path id and request body id values must match' });
    }

    const deliverableUpdate = {
        pressure: req.body.pressure,
        name: req.body.name,
        desc: req.body.desc,
        prephrs: req.body.prephrs
    };

    const validation = Joi.validate(deliverableUpdate, DeliverableJoiSchema);
    if (validation.error) {
        return response.status(400).json({error: validation.error});
    }

    const updated = {};
    const updateableFields = ['pressure', 'name', 'desc', 'prephrs'];
    updateableFields.forEach(field => {
        if(field in req.body) {
            updated[field] = req.body[field];
        }
    });

    Deliverable.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
        .then(updateddeliverable => {
            return res.status(200).json(updateddeliverable.serialize());
        })
        .catch(err =>  {
            console.error(err);
            return res.status(500).json({ error: 'something went wrong!' });
        });
});

//  remove deliverable by id
deliverableRouter.delete('/:id', (req, res) => {
    return Deliverable.findByIdAndRemove(req.params.id)
        .then(() => {
            console.log('deleting entry...');
            res.status(200).json({success: 'deliverable has been removed'});
        })
        .catch(error => {
            console.error(err);
            return res.status(500).json({ error: 'something went wrong!' });
        });
});

*/

module.exports = {deliverableRouter};