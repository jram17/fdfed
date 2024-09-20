const Complaint = require('../models/complaintModel');

exports.createComplaint = (req, res) => {
  const { complaintTitle, complaintType, complaintDetail } = req.body;
  const userId = req.user._id;  // Assuming you have a way to get the current user's ID

  const complaint = new Complaint(complaintTitle, complaintType, complaintDetail, userId);

  complaint.save()
    .then(result => {
      res.status(201).json({ message: 'Complaint registered successfully!', complaintId: result.insertId });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.getComplaints = (req, res) => {
  Complaint.fetchAll()
    .then(complaints => {
      res.status(200).json(complaints.rows);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
