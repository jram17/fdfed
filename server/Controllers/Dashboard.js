const dbModel = require("../Models/RoomModel");
const UserApartment = require("../Models/ApartmentUserModel");
const User = require("../Models/UserModel");
const userComplaintsModel = require("../Models/ComplaintModel");
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
                    return { ...room.toObject(), username: userApartment.username, flat_id: userApartment.flat_id, designation: userApartment.user_designation };
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
            console.log("hit");
            const user = await User.findById(req.id);
            const userComplaints = await userComplaintsModel.find({ user: req.id });
            const apartment = await UserApartment.find({ user: req.id });
            console.log(user, userComplaints, apartment);



            return res.status(200).json({ user: user, complaints: userComplaints, apartment: apartment });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }




}

module.exports = DashBoardController;
