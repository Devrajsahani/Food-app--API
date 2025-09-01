const testUserController = async(req, res) =>{
    try{
        res.status(200).send({
            success:true,
            message:'test user data'
        })

    }catch(error){
        console.log('error in test API, error')

    }

}
export default testUserController();