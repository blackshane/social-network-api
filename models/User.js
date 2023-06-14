const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type:String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'email Address not Valid'],
        },
        thoughts: {
            
        }
    },
    {
        toJSON: {
        virtuals: true,
      },
        id: false,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User; 