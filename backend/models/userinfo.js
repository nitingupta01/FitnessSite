const mongoose=require('mongoose');
const {Schema , model} = mongoose;

const UserInfoSchema = new Schema({
    id:{type:Schema.Types.ObjectId , ref:'user'},
    email:{type:String},
    dob:{type:Date , default:new Date()},
    isAdmin:{type:Boolean , default:false},
    name:{type:String},
    contact:{type:Number , default:0},
    cart:[
        {
            product_id:{type:String , default:0},
            name : {type:String , default:""},
            type: {type:String , default:""},
            count:{type:Number , default:0},
            price :{type:String, default:""}
        },
    ],
    distance:{type:Number , default:0},
    duration:{type:Number , default:0},
    calories:{type:Number , default:0},
    workout:{type:Number , default:0},
    goals:[{
        goalname:{type:String , default:""},
        goalduration:{type:Number , default:""},
        goaldistance:{type:Number , default:""}
    }]
});

const UserInfoModel = model('userinfo' , UserInfoSchema);

module.exports = UserInfoModel;

