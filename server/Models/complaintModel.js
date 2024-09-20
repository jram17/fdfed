class Complaint {
    constructor(complaintTitle, complaintType, complaintDetail, userId) {
      this.complaintTitle = complaintTitle;
      this.complaintType = complaintType;
      this.complaintDetail = complaintDetail;
      this.userId = userId;
    }
  
    save() {
      // Implement the logic to save complaint to the database
      const query = `
        INSERT INTO complaints (complaint_title, complaint_type, complaint_detail, user_id)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [this.complaintTitle, this.complaintType, this.complaintDetail, this.userId];
  
      return db.query(query, values);  // Assuming you have a db module to interact with the database
    }
  
    static fetchAll() {
      const query = 'SELECT * FROM complaints';
      return db.query(query);
    }
  }
  
  module.exports = Complaint;
  