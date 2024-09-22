const dbModel = require("../Models/RoomModel");
const ApartmentUserModel = require("../Models/ApartmentUserModel");


class RoomDetails {
    async fetchDetails(req, res) {

        const { apartment_id } = req.params;
        try {
            const roomDetails = await dbModel.findOne({ apartment_id });
            if (!roomDetails) {
                return res.status(404).json({ message: 'Room not found' });
            }
            const ApartmentUser = await ApartmentUserModel.findOne({ apartment_id: apartment_id, user: req.id });
            if (!ApartmentUser) {
                return res.status(401).json({ message: 'Unauthorized access' });
            }
            return res.status(200).json({
                details: {
                    apartment_id: roomDetails.apartment_id,
                    apartment_name: roomDetails.apartment_name,
                    ownername: roomDetails.ownername,
                    start_date: roomDetails.createdAt,
                    number_of_residents: roomDetails.resident_id ? roomDetails.resident_id.length : 0,
                    user_id: req.id,
                    role: ApartmentUser.user_designation,
                    isAuthority: ApartmentUser.user_designation === 'Owner' || ApartmentUser.user_designation === 'Authority' || ApartmentUser.user_designation === 'Security',
                    username: ApartmentUser.username

                }
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}


module.exports = RoomDetails;