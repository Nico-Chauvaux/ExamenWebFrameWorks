var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('exam')
})

/* GET ALL STUDENTS */
router.get('/', (req, res) => {
  db.collection('students').find().toArray((err, result) => {
    if (err) return
    res.render('list.ejs', { students: result })
  })
})

/* ADD STUDENT TO DB */
router.post('/', (req, res) => {
    db.collection('students').insertOne(req.body, (err, result) => {
      if (err) return
      res.redirect('/')
    })
  })

module.exports = router;