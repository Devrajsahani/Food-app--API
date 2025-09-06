import categoryModel from "../models/category.model.js";

// create cat 
const createCatController = async(req,res)=>{
    try{
        const {title,imageUrl}=req.body;
        //validation 
        if(!title){
            return res.status(500).send({
                success:false,
                message:'Please provide category title or image',
            });
        }
        const newCategory = new categoryModel({ title, imageUrl })
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:'Category created',
            newCategory,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create cat API',
            error
        });
    }
};

// get all cat
const getAllCatController = async(req,res)=>{
    try{
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'No categories found',
            });
        }
        res.status(200).send({
            success:true,
            totalCat: categories.length,
            categories,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get all category API',
            error,
        })
    }
};

// update cat controller
const updateCatController = async(req,res)=>{
    try{
        const { id }= req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title, imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'No category found',

            });
        }
         res.status(200).send({
            success:true,
            message:"Category updated Successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update cat API',
            error
        })
    }

};
// delete cat
const deleteCatController = async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
             return res.status(500).send({
                success:false,
                message:'please provide category Id',
             });


        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No category found with this Id'
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Cat deleted successfully',

        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete cat api',
            error
        })
    }
};

export { createCatController, getAllCatController,updateCatController,deleteCatController };
