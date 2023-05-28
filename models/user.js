const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const{ Schema } = mongoose;

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 8
        },
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 15,
        },
        lastName:{
            type: String,
            required: true,
            minLength: 3,
            maxLength: 15,
        },
        password: {
            type: String,
            required: true,
        },
        dob:{
            type: Date,
            optional: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isUser: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            // to hide password from body 
            transform(doc, ret){
                delete ret.password;
            }
        }
    },
);

usersSchema.pre("save", function preSave(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next();
});

usersSchema.methods.verifyPassword = function verifyPassword(password){
  return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model('User', usersSchema);

module.exports = {
    User
};