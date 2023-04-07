const mongoose = require('mongoose');

const PrinciplesSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true,
        trim: true
    },
     text: {
        type: String,
        required: true,
        trim: true
     },
     user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

module.exports = mongoose.model('Principles', PrinciplesSchema);
