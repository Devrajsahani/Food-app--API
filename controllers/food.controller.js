import foodModel from "../models/food.model.js";

// create food 
const createFoodController = async(req,res)=>{
    try{
        const {title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating} = req.body;
            if(!title || !description|| !price || !restaurant){
                return res.status(500).send({
                    success:false,
                    message:'Please provide all fields',
                })
            }
            const newFood = new foodModel({
                title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating
            });
            await newFood.save();
            res.status(201).send({
                success:true,
                message:"New food item created",
                newFood
            })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create food api',
            error
        })
    }
};
// get all food 
const getAllfoodController = async(req,res)=>{
    try{
        const foods= await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'No food items was found',
            });
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get all foods API',
            error
        });
    }
}

// get single food controller
const getSingleFoodController = async(req,res)=>{
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please provide Id',

            });
        }
        res.status(200).send({
            success:true,
            food,
        })
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.send(404).send({
                success:false,
                message:'No food found',
                error
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single food API",
            error
        })

    }
};

// get food by rest controller
const getFoodByRestaurantController = async(req,res)=>{
    try{
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Please provide Id',

            });
        }
        const food = await foodModel.find({restaurant:restaurantId});
        if(!food){
            return res.send(404).send({
                success:false,
                message:'No food found of this id',
                error
            });
        }
        res.status(200).send({
            success:true,
            message:'Food base on restaurant',
            food,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single food API",
            error
        })

    }
};

// update food item
const updateFoodController = async(req,res)=>{
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'No food id was found',
                error
            });
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No food found',
            });
        }
        const { title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating } = req.body ;
            const updatedFood = await foodModel.findByIdAndUpdate(foodId,{
                title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isFoodAvailabel,
            restaurant,
            ratingCount,
            rating 
            },{new:true});
            res.status(200).send({
                success:true,
                message:'Food item was updated',
            })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Errorn in update food API',
            error
        });
    }
}
// delete food 
const deletefoodController = async(req,res)=>{
    try{
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'provide food id',

        });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No food found with id'
            })
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success:false,
            message:'Food item deleted',
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete food api',
            error
        })
    }
}

export { createFoodController,
     getAllfoodController, 
     getSingleFoodController, 
     getFoodByRestaurantController, 
     updateFoodController,
     deletefoodController,
    };