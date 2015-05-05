var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var user = new Schema({
  _id: Schema.Types.ObjectId,
  role: { type: String, default: 'user' },
  firstName: { type: String, select: false},
  lastName: { type:String, select: false },
  email: { type: String, required: true, select: false },
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false},
  last_logged_in: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  braids: [{ type: Schema.Types.ObjectId, ref: 'Braid'}],
  modifiers: [{ type: Schema.Types.ObjectId, ref: 'Modifier'}]
});

user.virtual('fullname').get(function(name){
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', user);
