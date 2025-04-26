const { Resend } = require("resend");
const env_variables = require("../utils/envutils");
const LogModel = require("../Models/LogModel");
const { customAlphabet } = require("nanoid");
const { getRole } = require("../middlewares/RoleValidationMiddleware");
class LogController {
  constructor() {
    this.resend = new Resend(env_variables.RESEND_API);
  }

  getSixHoursFromNowTimestamp() {
    const now = new Date();
    const sixHoursLater = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours in ms
    return sixHoursLater;
  }
  generateOtp() {
    const nanoid = customAlphabet("1234567890abcdef", 10);
    return nanoid();
  }

  async sendOtp(req, res) {
    try {
      const { apartmentuser, apartment_id, guestemail } = req.body;
      if (!apartment_id || !apartmentuser || !guestemail) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = getRole(req.id, apartment_id);
      if (!role) {
        return res.status(403).json({
          message: "Not available in the apartment",
        });
      }
      const otp = this.generateOtp();
      const loginvite = new LogModel({
        apartmentuser,
        apartment_id,
        otp,
        masterguestemail: guestemail,
        expiresOn: this.getSixHoursFromNowTimestamp(),
      });
      await loginvite.save();

      const { _data, error } = await resend.emails.send({
        from: env_variables.ADMIN_EMAIL,
        to: [guestemail],
        subject: "Your OTP",
        html: `otp for the invite is ${otp} for ${guestemail}`,
      });
      if (error) {
        return res.status(400).json({ message: "Error in sending invitation" });
      } else {
        return res
          .status(200)
          .json({ message: "OTP sent to the guest successfully", data: _data });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  async getLogs(req, res) {
    try {
      const { apartment_id } = req.params;
      if (!apartment_id) {
        return res.status(400).json({
          message: "Invalid Data",
        });
      }
      const role = getRole(req.id, apartment_id);
      if (role != "Owner" || role != "Security") {
        return res.status(400).json({
          message: "Not allowed for the data",
        });
      }
      const logs = await LogModel.find({ apartment_id });
      return res.status(200).json({
        response: logs,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  async getUserLogs(req, res) {
    try {
      const { apartment_id, apartmentuser } = req.params;
      if (!apartment_id || !apartmentuser) {
        return res.status(400).json({
          message: "Invalid Data",
        });
      }
      const logs = await LogModel.find({ apartment_id, apartmentuser });
      return res.status(200).json({
        response: logs,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  async regsiterGuestEntry(req, res) {
    try {
      const { apartment_id, apartmentuser, guestemail, otp } = req.body;
      if (!apartment_id || !apartmentuser || !guestemail || !otp) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = getRole(req.id, apartment_id);
      if (role != "Security") {
        return res.status(403).json({
          message: "Not available in the apartment",
        });
      }
      const log = await LogModel.findOne({
        apartment_id,
        apartmentuser,
        masterguestemail: guestemail,
      });
      if (log.otp != otp && !this.isExpired(log.expiresOn)) {
        return res.status(400).json({
          message: "Invalid OTP",
        });
      }
      log.entrytime = new Date.now();
      await log.save();
      return res.status(200).json({
        message: "OTP validation successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  isExpired(expiresOn) {
    const now = new Date();
    const expiryDate = new Date(expiresOn);
    return expiryDate < now; // true if expired, false if still valid
  }
  async registerGuestExit(req, res) {
    try {
      const {apartment_id , apartmentuser , guestemail} = req.body;
      if (!apartment_id || !apartmentuser || !guestemail) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = getRole(req.id, apartment_id);
      if (role != "Security") {
        return res.status(403).json({
          message: "Not available in the apartment",
        });
      }

      const log = await LogModel.findOne({
        apartment_id,
        apartmentuser,
        masterguestemail: guestemail,
      });
      log.exittime = new Date.now();
      await log.save();
      return res.status(200).json({
        message: "Guest Log completed",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = LogController;
