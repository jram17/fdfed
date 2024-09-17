const ApartmentData = require("../Models/UserApartmentModel");
const RoomModel = require("../Models/RoomModel");
class RoomController {
    async userRooms(req, res) {
        const userRooms = await ApartmentData.findOne({ user: req.id });
        if (userRooms.apartments.length == 0) {
            return res.status(200).json({ message: "No apartments found" });
        }
        const Rooms = await Promise.all(
            userRooms.apartments.map(async (id) => {
                const room = await RoomModel.findById(id);
                return {
                    apartment_id: room.apartment_id,
                    apartment_name: room.apartment_name,
                    ownername: room.ownername
                };
            })
        );
        return res.status(201).json({ details: Rooms });
    }
}


module.exports = RoomController;