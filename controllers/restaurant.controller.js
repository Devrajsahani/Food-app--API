import restaurantModel from "../models/restaurant.model.js";
import restaurentModel from "../models/restaurant.model.js";

// create restaurant 
const createRestaurantController = async(req,res)=>{
    try{
        const { title, imageUrl, foods, time, pickup , delivery, logoUrl, isOpen, rating,ratingcount, code, coords} = req.body;
        // validation 
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please provide title and address',
            });
        }
        const newRestaurant = await restaurentModel({
            title, imageUrl, foods, time, pickup , delivery, logoUrl, isOpen, rating,ratingcount, code, coords
        });
         await newRestaurant.save();
         res.status(201).send({
            success:true,
            message:'New Restaurant is created successfully'
         });

    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in create restaurant api',
        error
    })

    }
};

// GET ALL RESTAURANT 
const getAllRestaurantController = async(req,res)=>{
    try{
        const restaurants = await restaurentModel.find({})
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:'No restaurants available',
                error
            });
        }
        res.status(200).send({
            success:true,
            totalCount: restaurants.length,
            restaurants
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'No restaurant available',
            error
        });
    }
}

// get restaurant by id 
const getRestaurantByIdController = async(req,res)=>{
    try{
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                status:false,
                message:'Restaurant id does not match'
            });
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:'No restaurant found'
            });
        }
        res.status(200).send({
            success:true,
            restaurant
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get Restaurant by Id API',
            error
        });
    }
}
// delete restaurant 

const deleteRestaurantController = async(req, res)=>{
    try{
        const restaurantId = req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Please provide Restaurant ID',
            });
        }
        await restaurantModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success:true,
            message:'Restaurant Deleted successfully'

        });

    }catch(error){
        console.log(error)
        req.status(500).send({
            success:false,
            message:'Error in delete restaurant api',
            error
        });
    }
}

export { createRestaurantController,
     getAllRestaurantController,
      getRestaurantByIdController,
      deleteRestaurantController,
    };