
import mongoose from 'mongoose';

// function mongodb database connection 

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to database ${mongoose.connection.host}`);
        
    }catch(error){
        console.log("DB error",error);

    }
}
export default connectDB;