const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false,
  },
  expiry: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 3600000);
    }
  }
}, { timestamps: true });

// Schedule document deletion when expiry time is reached
reportSchema.pre('save', function(next) {
  const now = new Date();
  if (now >= this.expiry) {
    // Expiry time already passed, delete document
    this.model('Report').deleteOne({ _id: this._id }).exec();
  }
  const timeToExpiry = this.expiry - now;
  setTimeout(() => {
    this.model('Report').deleteOne({ _id: this._id }).exec();
  }, timeToExpiry);
  next();
});

module.exports = mongoose.model('Report', reportSchema);
