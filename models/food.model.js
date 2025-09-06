import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Food title is required"],

    },
    description:{
        type:String,
        required:[true]
    },
    price:{
        type:Number,
        required:[true,'Food price is require']

    },
    imageUrl:{
        type:String,
        default:"",
    },
    foodtags:{
        type:String,

    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isFoodAvailabel:{
        type:Boolean,
        default:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,

    },
    
},{timestamps:true});

export default mongoose.model('Food',foodSchema);