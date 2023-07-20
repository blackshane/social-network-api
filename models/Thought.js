const { Schema, model, default: mongoose } = require('mongoose'); 

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
      },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual property to get the reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
const Reaction = model('reaction', reactionSchema)

const handleError = (err) => console.error(err);

Reaction
  .create(
    [
        {
        reactionBody: 'Wow! That was Great',
        username: 'Billy-Bob_Joe-Bob',   
    },
        {
        reactionBody: 'Absolutely amazing!',
        username: 'BettyMay'
    }

]
)
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));

  Thought
  .create(
    [
        {
            thoughtText: 'It is quite the sunny day',
            username: 'Billy-Bob_Joe-Bob'
        },
        {
            thoughtText: 'I hate sunny days!',
            username: 'BettyMay'
        }
    ]
  )
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));


module.exports = Thought;

