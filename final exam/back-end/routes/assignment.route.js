const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment.model');

/**
 * Get details of all the assignments from the database
 * @returns {Assignment[]} array of assignments or error message
 */
router.route('/').get((req, res) => {
    Assignment.find()
        .then(assignments =>
            res.status(200).send(assignments)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Add a new assignment to the database
 * @param {string} category Category of the assignment
 * @param {number} prodId Id of the assignment
 * @param {string} name Name of the assignment
 * @param {number} price Price of the assignment
 * @param {number} discount Discount of the assignment
 * @returns success or error message
 */
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const subject = req.body.subject;
    const deadline = Date.parse(req.body.deadline);

    console.log(req.body);

    const newAssignment = new Assignment({
        name,
        description,
        subject,
        deadline
    });
    console.log(newAssignment);
    newAssignment.save()
        .then(() => res.send({message: 'Assignment added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Get details of a assignment from the database
 * @param object id of the assignment
 * @returns {Assignment} assignment / error message
 */
router.route('/:id').get((req, res) => {
    Assignment.findById(req.params.id)
        .then(assignment => {
            res.status(200).send(assignment);
            console.log(assignment)
        })
        .catch(err =>
            res.status(400).send('Error: ' + err)
        );
});

/**
 * Delete an assignment from the database
 * @param object id of the assignment
 * @returns success or error message
 */
router.route('/delete/:id').delete((req, res) => {
    Assignment.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: 'Assignment deleted!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Update details of a assignment
 * @param object id of the assignment
 * @returns success or error message
 */
router.route('/update/:id').put((req, res) => {
    Assignment.findById(req.params.id)
        .then(assignment => {
            assignment.name = req.body.name;
            assignment.description = req.body.description;
            assignment.subject = req.body.subject;
            assignment.deadline = req.body.deadline;

            assignment.save()
                .then(() => res.send({message:'Assignment updated!'}))
                .catch(err =>
                    res.status(400).send({message: 'Error: ' + err})
                );
        })
        .catch(err =>
            res.status(400).json('Error: ' + err)
        );
});

module.exports = router;