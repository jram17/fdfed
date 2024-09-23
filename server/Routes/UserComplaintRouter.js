const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLogin");
const { createComplaint,getApartmentDetails } = require('../Controllers/complaintController');

require("../config/passport_config");


class CreateRoomComplaint{
    constructor(){
       
            this.route = express.Router();
            this.route.use(jwt_authenticate);
            this.route.post('/', jwt_authenticate, createComplaint);
            this.route.get('/:apartment_id',getApartmentDetails);
       
    
            
    
        
    }
}


module.exports = new CreateRoomComplaint().route;


