const ApartmentUserModel = require("../Models/ApartmentUserModel");
const { isVerified } = require("../middlewares/RoleValidationMiddleware");
const env_variables = require("..//utils/envutils");
const Verification = require("../Models/VerificationTokenModel");
const { v4: uuid } = require("uuid");
const Resend = require("resend");
class JoinRoom {
    constructor() {
        console.log(this.resend);
        this.resend = new Resend(env_variables.RESEND_API);
    }
    getSixHoursFromNowTimestamp() {
        const now = new Date();
        const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours in ms
        return sixHoursLater;
    }

    async sentinvitation(req, res) {
        try {
            const { email, apartment_id } = req.body;
            if (!email || !apartment_id) {
                return res.status(403).json({
                    message: "Invalid Data",
                });
            }
            const isvalid = await isVerified(req.id, apartment_id, "Owner");
            if (!isvalid) {
                return res.status(403).json({
                    message: "Not allowed to perform this action",
                });
            }
            const token = uuid();
            const isAlreadysend = await Verification.findOne({
                useremail: email,
                apartment_id,
            });
            if (isAlreadysend) {
                isAlreadysend.token = token;
                isAlreadysend.expiresOn = this.getSixHoursFromNowTimestamp();
                await isAlreadysend.save();
            } else {
                const newVerificationToken = new Verification({
                    email: useremail,
                    apartment_id,
                    token,
                    expiresOn: this.getSixHoursFromNowTimestamp(),
                });
                await newVerificationToken.save();
            }
            const { data, error } = await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: [email],
                subject: "hello world",
                html: "<strong>it works!</strong>",
            });
            if (error) {
                return res.status(400).json({ message: "Error in sending invitation" });
            } else {
                return res
                    .status(200)
                    .json({ message: "Invitation sent successfully" });
            }
        } catch (error) {
            console.error("Internal Server Error", error);
            return res.status(500).json({ error: error.message });
        }
    }
    isExpired(expiresOn) {
        const now = new Date();
        const expiryDate = new Date(expiresOn);
        return expiryDate < now; // true if expired, false if still valid
    }

    async joinroom(req, res) {
        try {
            const { email, apartment_id, token, flat_no } = req.body;
            if (!email || !apartment_id || !token || !flat_no) {
                return res.status(403).json({
                    message: "Invalid Data",
                });
            }

            const tokenVerification = await Verification.findOne({
                useremail: email,
                apartment_id,
            });
            if (!tokenVerification) {
                return res.status(403).json({
                    message: "There is no invitation from the particular room ",
                });
            }
            const isvalid = this.isExpired(tokenVerification.expiresOn);
            if (!isvalid) {
                res.status(403).json({
                    message: "The invitation is not valid",
                });
            }
            const isUser = await ApartmentUserModel.findOne({
                user: req.id,
                apartment_id,
            });
            if (isUser) {
                return res.status(403).json({
                    message: "User is already a member of the apartment",
                });
            }
            const newUser = new ApartmentUserModel({
                user: req.id,
                apartment_id,
                flat_id: flat_no,
                role: "Resident",
            });
            await newUser.save();
            await Verification.findByIdAndDelete(tokenVerification._id);
            return res.status(200).json({
                id: newUser._id,
                message: "User added successfully",
            });
        } catch (error) {
            console.error("Internal Server Error", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = JoinRoom;
