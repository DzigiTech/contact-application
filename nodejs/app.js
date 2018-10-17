const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contacts', {useNewUrlParser: true});
const Contact = require('./contact');

// GET
app.get('/contacts', function(req, res){
  Contact.find(function (err, recs) {
    if (err) {
      return res.status(400).send("error finding contact");
    }
    res.send(recs);
  })
})

app.get('/contacts/:id', function (req, res) {
  Contact.findOne({id: req.params.id}, function (err, recs) {
    if (err) {
      return res.status(400).send("error finding contact");
    }
    res.send(recs);
  })
})
// POST
app.post('/newcontact', function (req, res) {
  const contact = new Contact({
    _id: mongoose.Types.ObjectId(),
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    birthdate: req.body.birthdate,
    phone: req.body.phone,
    gender: req.body.gender,
    type: req.body.type
  })
  contact.save(function (err, rec){
    if (err) {
      return res.status(400).send("error creating the contact")
    }
    res.send(rec);
  });
})
// PUT
app.put('/contacts/:id/edit', function (req, res) {
  Contact.findOneAndUpdate(
    {id: req.params.id},
    {$set:{
      age:req.body.age,
      birthdate:req.body.birthdate,
      gender:req.body.gender,
      phone:req.body.phone,
      type:req.body.type}}, function (err, recs) {
    if (err) {
      return res.status(400).send("error finding contact");
    }
    res.send(recs);
  })
})
// DELETE
app.delete('/contacts/:id', function (req, res) {
  Contact.remove({id: req.params.id}, function (err, recs) {
    if (err) {
      return res.status(400).send("error finding contact");
    }
  })
})

app.listen(3000, function(){
  console.log("Server is listening on port 3000...");
})
