var mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/memes';
mongoose.connect(mongoURI, { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});


var phoneNumbersSchema = mongoose.Schema({
  name: String,
  phoneNumber: String
});

var PhoneNumber = mongoose.model('PhoneNumber', phoneNumbersSchema);

module.exports.addPhonenumber = (data, cb) => {
  console.log("about to save phoneNumber to db", data)
  let info = new PhoneNumber(data);

  info.save(info, (err, result) => {
    if (err) {
      console.log("An error as occured posting to db");
      cb(err, null)
    } else {
      console.log("Successfully posted to db: ", result);
      cb(null, result)
    }
  })
}

module.exports.getPhonenumbers = (cb) => {
  PhoneNumber.find((err, docs) => {
    if (err) {
      console.log("An error has occured getting phonenumber info: ", err);
      cb(err, null);
    } else {
      console.log("data in server! ", docs);
      cb(null, docs);
    }
  })
}

module.exports.findOne = (name, cb) => {
  PhoneNumber.findOne(name, (err, docs) => {
    if (err) {
      console.log("An error has occured getting phonenumber info: ", err);
      cb(err, null);
    } else {
      console.log("data in db! ", docs);
      cb(null, docs);
    }
  })
}