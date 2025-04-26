const ApartmentUser = require('../Models/ApartmentUserModel')

const isVerified =async (userid , apartmentid,role) =>{
   const isUser = await ApartmentUser.findOne({
        user:userid,
        apartment_id:apartmentid
    })
    if(!isUser) return false ;
    if(isUser.role!=role) return false ;
    return true ;
}


 const getRole = async(userid , apartmentid)=>{
    const user = await ApartmentUser.findOne({
        user:userid,
        apartment_id:apartmentid
    });
    if(!user) return null ;
    return user.role;
}


module.exports = { isVerified, getRole}

