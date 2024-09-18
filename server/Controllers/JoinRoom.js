const ApartmentUserModel = require("../Models/ApartmentUserModel");
const dbModel = require("../Models/RoomModel");
const userRoomdb = require("../Models/UserApartmentModel");
class JoinRoom {

    async joinroom(req, res) {
        try {
            const { apartment_id, flat_id } = req.body;

            if (!apartment_id || !flat_id) {
                return res.status(400).json({ message: "apartment_id and flat_id are required" });
            }


            const Room = await dbModel.findOne({
                apartment_id: apartment_id
            });


            if (!Room) {
                return res.status(404).json({ message: "Room not found" });
            }

            const addUser = new ApartmentUserModel({
                user: req.id,
                username: `${req.userDetails.username}-${flat_id}`,
                flat_id: flat_id,
                user_designation: 'Resident'
            });

            await addUser.save();
            const userRoom = await userRoomdb.findOneAndUpdate(
                { user: req.id },
                { $push: { apartments: Room._id } },
                { new: true }
            );

            if (!userRoom) {
                return res.status(404).json({ message: "User's apartment data not found" });
            }
            if (!Room.resident_id) {
                Room.resident_id = [addUser._id];
            } else {
                Room.resident_id.push(addUser._id);

            }
            await Room.save();

            return res.status(200).json({ message: "Room joined successfully" });

        } catch (error) {
            console.error("Error joining room:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = JoinRoom;
