var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var CompanySchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  services: [{

    name: {type: String},
    description: {type: String},
    cost: {type: String}

  }],
  price: {
    type: Number,
    required: true
  },
  descriptions: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  reviews: [{
    type: Schema.Types.ObjectId, ref: 'Review',
    required: false
  }],
  orders: [{
    type: Schema.Types.ObjectId, ref: 'Order',
    required: false
  }],
  location:{
    longitude: {type: Number, required: false},
    latitude: {type: Number, required: false}
  }
});

CompanySchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

CompanySchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Company', CompanySchema);
