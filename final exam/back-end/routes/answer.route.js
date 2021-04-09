const router = require('express').Router();
const Answer = require('../models/answer.model');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    }
});

const upload = multer({ storage: storage });


/**
* Add a new product answer to the database
* @param Answer file path
* @returns success or error message
*/
router.route('/add').post(upload.single('file'), (req, res) => {
    const data = fs.readFileSync(req.file.path);
    const contentType = 'application/pdf';
    console.log(req.body);
    //console.log(ansId);

    const newAnswer = new Answer({
        ans: {
            data: data,
            contentType: contentType
        },
    });

    newAnswer.save()
        .then(() => res.send({message: 'Answer added to the db!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Get all the answers from the database
 * @returns {Answer[]} array of answers / error message
 */
router.route('/').get((req, res) => {
    Answer.find()
        .then(answers => {
            res.contentType('json');
            res.status(200).send(answers);
            console.log(answers);
        })
        .catch(err => {
            res.status(400).send({message: 'Error: ' + err})
        });

});

module.exports = router;