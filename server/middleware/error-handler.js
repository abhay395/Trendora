import ApiError from '../utils/ApiError.js'
const errorHandlerMiddleware = (err,req,res,next)=>{

    if(err instanceof ApiError){
        // console.log(err.message)
        return res.status(err.statusCode).json({message:err.message,success:false})
    }
    console.log(err)
    return res.status(500).json({message:"Somthing Went Wrong ,Please try again","success": false})
}

export default errorHandlerMiddleware