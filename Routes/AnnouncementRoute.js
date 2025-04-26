const { jwt_authenticate } = require("../middlewares/PassportLoginMiddleware");
const Annnouncement = require("../Models/ApartmentAnnouncementsModel");
const express = require("express");
const { getRole } = require("../middlewares/RoleValidationMiddleware");
const route = express.Router();

const createAnnouncement = async (req, res) => {
    try {
        const {
            apartment_username,
            apartment_id,
            announcement_msg,
            fileUrl,
            filename,
        } = req.body;
        if (!announcement_msg) {
            return res.status(400).json({ error: "Data is not valid" });
        }
        const role = getRole(req.id, apartment_id);
        if (role != "Owner" || role != "Authority") {
            return res.status(400).json({
                message: "Not valid to perform the action",
            });
        }
        const announcement = new Annnouncement({
            apartmentuser: apartment_username,
            apartment_id,
            announcement_msg,
            fileUrl,
            filename,
        });
        await announcement.save();
        return res.status(201).json({ message: "Announcement Made", announcement });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getAnnouncements = async (req, res) => {
    try {
        const { apartment_id } = req.params;
        const announcements = await Annnouncement.find({ apartment_id }).sort({
            timestamp: -1,
        });
        res.status(200).json(announcements);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
route.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).send("Error downloading file");
            }
        });
    } else {
        res.status(404).send("File not found");
    }
});

route.get("/:apartment_id", getAnnouncements);
route.post(
    "/create",
    jwt_authenticate,
    createAnnouncement,
);
module.exports = route;
