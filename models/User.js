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
            type: Schema.Types.ObjectId,
            ref: 'Thought'
          }
        ],
        friends: [
          {
            type: Schema.Types.ObjectId,
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
    
    const User = model('User', userSchema);

    const handleError = (err) => console.error(err)

    User.findOne({ username: 'Billy-Bob_Joe-Bob' })
    .then(user => {
      if (user) {
        // Username already exists, do not create the document
        console.log('Username already exists:', user.username);
      } else {
        // Username does not exist, create the document
        User.create({ username: 'Billy-Bob_Joe-Bob', email: 'billybob@yahoo.com' })
          .then(result => console.log('Created new document:', result))
          .catch(err => handleError(err));
      }
    })
    .catch(err => handleError(err));
    
  User.findOne({ username: 'BettyMay' })
  .then(user => {
    if (user) {
      // Username already exists, do not create the document
      console.log('Username already exists:', user.username);
    } else {
      // Username does not exist, create the document
      User.create({ username: 'BettyMay', email: 'bettyspaghetti@yahoo.com' })
        .then(result => console.log('Created new document:', result))
        .catch(err => handleError(err));
    }
  })
  .catch(err => handleError(err));

  
  
    
    module.exports = User;

