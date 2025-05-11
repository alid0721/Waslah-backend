const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Username is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    hashedPassword:{
        type:String,
        required:[true,"Password is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:String,
        required:[true,"Phone is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        required:[true,"Age is Required"],
        lowercase:true,
        trim:true
    },
    experience:{
        type:String,
        required:[true,"Work Experience is Required"],
        lowercase:true,
        trim:true
    },
    degree:{
        type:String,
        required:[true,"Degree is Required"],
        lowercase:true,
        trim:true,
        default:"Bachelor's Degree"
    },
    type:{
        type:String,
        required:[true,"Type is Required"],
        enum:["trainee","supervisor","proffessor","student"],
        default:"applicant"
    },
    cv:{
        type:String,
    }

},{ timestamps: true })

const User = model("User",userSchema)

module.exports = User