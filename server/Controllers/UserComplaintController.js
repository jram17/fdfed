const Complaint = require('../Models/UserComplaintModel');
const ApartmentUser = require('../Models/ApartmentUserModel'); // Adjust as necessary

exports.createComplaint = async (req, res) => {
    const { complaintTitle, complaintType, complaintDetail,anonymous,apartment_id } = req.body;
    const userId = req.id; 

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
    return res.status(200).json(complaint);


    
} catch (error) {
    return res.status(500).json({error:"Server Error"})
}
    
};


exports.getComplaints = async (req, res) => {
    try {
        // Fetch all complaints and populate necessary fields
        const complaints = await Complaint.find()
            .populate('userId', 'username uuid') // Populate user details
            .populate('apartment_id', 'apartment_name flat_id'); // Populate apartment details

        res.status(200).json(complaints);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting complaint' });
  }
};
