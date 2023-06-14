const { Schema, model } = require('mongoose');

// Use imported Schema to create a new instance called userSchema
const userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
        },
        thoughts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
          }
        ],
        friends: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      },
      {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
    );
    
    // Virtual property to get the friendCount
    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    });
    
    const User = mongoose.model('User', userSchema);
    
    module.exports = User;