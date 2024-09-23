const Complaint = require('../models/UserComplaintModel');


const createComplaint = async (req, res) => {
    const { complaintTitle, complaintType, complaintDetail,anonymous,apartment_id } = req.body;
    const userId = req.id; // Use req.user if available

try {
    let UserDetails
    if(!anonymous){
        UserDetails= await ApartmentUser.findOne({user:req.id,apartment_id:apartment_id});
        console.log(UserDetails);
    }
    const complaint_details=    {complaintTitle: complaintTitle,
    complaintType: complaintType,
    complaintDetail: complaintDetail,
    anonymous:anonymous,
    userId:req.id,
    username: anonymous?'Anonymous':UserDetails.username, // New field
    apartment_id: apartment_id, // New field
    flat_id: anonymous?'000':UserDetails.flat_id} // New field
    const complaint=new Complaint(complaint_details);
    await complaint.save();
    return


    
} catch (error) {
    return res.status(500).json({error:"Server Error"})
}
    
};


const getApartmentDetails=async(req,res)=>{
  try {
    const {apartment_id}=req.params;
  const Complaints =await Complaint.find({apartment_id});
  return res.status(200).json(Complaints);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:error.message});
  }
}

module.exports={getApartmentDetails,createComplaint};