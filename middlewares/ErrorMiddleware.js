

const errorLogger=(err,req,res,next)=>{
    console.log("hit")
    console.error(`[ERROR] : ${err.message}`);
    next(err);
}

const errorHandler = (err,req,res,next)=>{
    return res.status(err.status || 500).json({
        message:err.message || 'Internal Server Error',
    })

}

module.exports={errorLogger,errorHandler};