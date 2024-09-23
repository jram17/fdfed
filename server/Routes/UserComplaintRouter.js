const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
const { createComplaint, getComplaints, deleteComplaint } = require('../Controllers/UserComplaintController');

require("../config/passport_config");


class CreateRoomComplaint{
    constructor(){
       
            this.route = express.Router();
            this.route.use(jwt_authenticate);
            this.route.post('/', jwt_authenticate, createComplaint);
            this.route.get('/', jwt_authenticate, getComplaints);
            this.route.delete('/:id', jwt_authenticate, deleteComplaint);
    
    
            
    
        
    }
}


module.exports = new CreateRoomComplaint().route;


