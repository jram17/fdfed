const dbModel = require("../Models/RoomModel");
const { v4: uuidv4 } = require('uuid');
const userRoomdb = require("../Models/UserApartmentModel");
class RoomModel {
    constructor() {

    }

    async createRoomReq(req, res) {
        try {
            const { name, registeration_num, state, address, pincode, email, subscription } = req.body;
            const uuid = uuidv4();
            const newRoom = new dbModel({
                owner: req.id,
                ownername: req.userDetails.username,
                apartment_name: name,
                address: address,
                apartment_id: uuid,
                state: state,
                pincode: pincode,
                registration_num: registeration_num,
                emergency_email: email,
                subscription: subscription,
            })
            await newRoom.save();
            const userRooms = await userRoomdb.find({ user: req.id });
            if (userRooms.length > 0) {
                userRooms[0].apartments.push(newRoom._id);
                await userRooms[0].save();

            }
            return res.status(200).json({ message: "Room created successfully", room: newRoom });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });

        }
    }
}

module.exports = RoomModel;