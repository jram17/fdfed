import { useState } from 'react';

function ComplaintForm() {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetail, setComplaintDetail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaintData = {
      complaintTitle,
      complaintType,
      complaintDetail,
    };
    // Send to backend
    fetch('/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Complaint Title</label>
        <input
          type="text"
          value={complaintTitle}
          onChange={(e) => setComplaintTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Complaint Type</label>
        <select value={complaintType} onChange={(e) => setComplaintType(e.target.value)}>
          <option value="Apartment Issue">Apartment Issue</option>
          <option value="Resident Issue">Resident Issue</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Complaint Detail</label>
        <textarea
          value={complaintDetail}
          onChange={(e) => setComplaintDetail(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit Complaint</button>
    </form>
  );
}

export default ComplaintForm;
