const ParcelController = require("../Controllers/ParcelController");
const express = require('express');
const { jwt_authenticate } = require("../middlewares/PassportLoginMiddleware");
require("../config/passport_config");

class ParcelRouter extends ParcelController {
    constructor() {
        super();
        this.route = express.Router();
        this.route.use(jwt_authenticate);
        this.route.use('/get-parcels/:apartment_id', this.getParcels.bind(this));
        this.route.post('/add-parcel', this.createParcel.bind(this));
        this.route.patch('/ack-parcels',this.acknowledgeParcels.bind(this));
        this.route.delete('/remove-ack-parcels',this.removeAckParcels.bind(this));
        this.route.get('/get-parcels/:apartment_id/:apartmentuser', this.getUserParcels.bind(this));

    }
}

module.exports = new ParcelRouter().route;
