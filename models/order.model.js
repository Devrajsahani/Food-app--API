import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    foods:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Foods'}
    ],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    status:{
        type:String,
        enum:['preparing','prepare','on the way', 'delivered'],
        default:'preparing',
    }
},{timestamps:true});

export default mongoose.model('Orders',ordersSchema);