const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/P-INSTA")
const plm = require(`passport-local-mongoose`);

const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true,
    },

    fullname: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    profile: {
        type: String,
        default: `default.jpg`
    },

    password: {
        type: String,
    },

    bio: {
        type:String,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `post`
    }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `user`
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `user`
    }],

    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `post`
    }],

    
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "story"
      }],

      story: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "story",
        },
    ]


})



userSchema.plugin(plm);


module.exports = mongoose.model(`user`, userSchema);