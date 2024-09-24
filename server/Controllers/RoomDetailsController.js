const dbModel = require("../Models/RoomModel");
const ApartmentUserModel = require("../Models/ApartmentUserModel");
const userModel = require("../Models/UserModel");
const userComplaints = require("../Models/ComplaintModel");
const UserApartment = require("../Models/UserApartmentModel");

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

    async ComplaintFilebyOwner(req, res) {
        const { apartment_id } = req.params;
        try {
            const { user_id, complaint, severity } = req.body;
            const Usercomplaint = new userComplaints({
                user: user_id,
                complaint: complaint,
                severity: severity,
                apartment_id: apartment_id
            });
            await UserComplaints.save();
            res.status(200).json(UserComplaints);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async RoleModification(req, res) {
        const { apartment_id, user_id, new_role } = req.body;
        try {
            const ApartmentUser = await ApartmentUserModel.findOneAndUpdate({ apartment_id: apartment_id, user: user_id }, { user_designation: new_role }, { new: true });
            if (!ApartmentUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(ApartmentUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async DeleteUsers(req, res) {
        const { apartment_id, username } = req.body;
        try {
            const ApartmentUser = await ApartmentUserModel.findOneAndDelete({ apartment_id: apartment_id, user: username });
            if (!ApartmentUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const room = await dbModel.findOne({ apartment_id });
            if (room.resident_id && room.resident_id.includes(username)) {
                room.resident_id = room.resident_id.filter((id) => id !== username);
                await room.save();
            }

            const user_rooms = await UserApartment.findOne({ user: username });
            if (user_rooms.apartments.includes(room._id)) {
                user_rooms.apartments = user_rooms.apartments.filter((id) => id !== room._id);
                await user_rooms.save();
            }
            return res.status(200).json({ message: "Successfully removed user" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    async RoomDetails(req, res) {
        const { apartment_id } = req.params;
        try {
            const room = await dbModel.findOne({ apartment_id });
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            const ApartmentUsers = await ApartmentUserModel.find({ apartment_id: apartment_id });
            const users = await Promise.all(ApartmentUsers.map(async (user) => {
                const userDetails = await userModel.findById(user.user);
                return {
                    user_id: user.user,
                    username: userDetails.username,
                    apartment_name: user.username,
                    role: user.user_designation,
                    email: userDetails.email,
                    isAuthority: user.user_designation === 'Owner' || user.user_designation === 'Authority' || user.user_designation === 'Security'
                };
            }));

            return res.status(200).json({ roomdetails: room, apartment_users: users });
        } catch (error) {
            return res.status(500).json({ error: error.message });

        }
    }
}


module.exports = RoomDetails;