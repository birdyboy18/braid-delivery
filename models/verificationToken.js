var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var verificationToken = new Schema({
  _userId: { type: String, required: true },
  token: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now, expires: '6h' }
}, { collection: 'verificationTokens' });

module.exports = mongoose.model('VerificationToken', verificationToken);
