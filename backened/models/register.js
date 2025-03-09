const moongoose=require("mongoose");
var validator = require('validator');


const userSchema=new moongoose.Schema({
    name :{
        type:String,
        required:true,
    },
     email :{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    phone:{
        type: String,
        required: true,
        validate: {
        validator: function (v) {
            return /^[0-9]{10}$/.test(v); 
        },
        message: "Invalid phone number"
    }
    },
    message:{
        type:String,
        required:true,
        minlength: [10, "Message must be at least 10 characters long"],
        maxlength: [100, "Message must be at most 100 characters long"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Register=new moongoose.model("Register",userSchema);

module.exports=Register;