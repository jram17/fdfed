const dbModel = require("../Models/RoomModel");
const UserApartment = require("../Models/ApartmentUserModel");
const User = require("../Models/UserModel");
const userComplaints = require("../Models/ComplaintModel");
class DashBoardController {
    async UserApartmentDetails(req, res) {
        try {
            const userApartments = await UserApartment.find({ user: req.id });

            if (!userApartments || userApartments.length === 0) {
                return res.status(404).json({ message: "User not found or no apartments" });
            }

            const apartments = await Promise.all(
                userApartments.map(async (userApartment) => {
                    const room = await dbModel.findOne({ apartment_id: userApartment.apartment_id });
                    if (!room) {
                        return { message: `No room found for apartment_id ${userApartment.apartment_id}`, username: userApartment.username };
                    }
                    return { ...room.toObject(), username: userApartment.username };
                })
            );

            return res.status(200).json({ apartments });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async UserDashDetails(req, res) {
        try {
            const user = await User.findById(req.id);
            const userComplaints = await userComplaints.find({ user: req.id });




            return res.status(200).json({ user: user, complaints: userComplaints });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DashBoardController;
