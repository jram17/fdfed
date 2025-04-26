const Apartment = require("../Models/RoomModel");
const ApartmentUser = require("../Models/ApartmentUserModel");
const ResidentLog = require("../Models/LogModel");
const Parcel = require("../Models/ParcelModel");
const Guest = require("../Models/GuestModel");
const {
  isVerified,
  getRole,
} = require("../middlewares/RoleValidationMiddleware");
class LogController {
  // Method to get all residents of a specific apartment
  async getResidents(req, res) {
    const { apartment_id } = req.params; // Extract apartment_id from the URL
    try {
      // Retrieve the apartment and populate the resident_id
      const apartment = await Apartment.findOne({ apartment_id }).populate(
        "resident_id",
        "username flat_id",
      );

      // Check if apartment exists
      if (!apartment) {
        return res.status(404).json({ error: "Apartment not found" });
      }

      // Return only the populated resident details
      return res.json(apartment.resident_id);
    } catch (error) {
      console.log(error);
      console.error("Error fetching residents:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }



  async createParcel(req, res) {
    const tokenFromClient = req.headers["x-csrf-token"];
    const tokenFromCookie = req.cookies.csrfToken;
    console.log(tokenFromCookie, tokenFromClient);
    if (
      !tokenFromClient ||
      !tokenFromCookie ||
      tokenFromClient !== tokenFromCookie
    ) {
      return res.status(403).json({ error: "Invalid CSRF token" });
    }
    const {
      apartmentuser,
      parcelReachedTime,
      parcelType,
      senderAddress,
      apartment_id,
    } = req.body;
    if (
      !apartmentuser ||
      !parcelReachedTime ||
      !parcelType ||
      !senderAddress ||
      !apartment_id
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const isvalid = isVerified(req.id, apartment_id, "Security");
    if (!isvalid) {
      return res.status(400).json({
        message: "Not allowed to perform this action",
      });
    }
    try {
      const newParcel = new Parcel({
        apartmentuser,
        apartment_id: apartment_id,
        parcelReachedTime,
        parcelType,
        senderAddress,
      });
      await newParcel.save();
      res.status(201).json(newParcel);
    } catch (error) {
      res.status(500).json({ message: "Error creating parcel", error });
    }
  }

  // Function to get all parcels
  async getUserParcels(req, res) {
    try {
      const { apartment_id, apartmentuser } = req.params;

      if (!apartment_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = await getRole(req.id, apartment_id);
      if (!role) {
        return res.status(400).json({
          message: "Not a member of the apartment",
        });
      }
      const parcels = await Parcel.find({
        apartment_id: apartment_id,
        apartmentuser,
        status: "Not Taken",
      });
      res.status(200).json(parcels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching parcels", error });
    }
  }

  async getParcels(req, res) {
    try {
      const { apartment_id } = req.params;
      if (!apartment_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = await getRole(req.id, apartment_id);
      if (role != "Owner" || role != "Security") {
        return res.status(400).json({
          message: "Not allowed to perform the action",
        });
      }
      const parcels = await Parcel.find({
        apartment_id,
        status: "Not Taken",
      });
      res.status(200).json(parcels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching parcels", error });
    }
  }

  async acknowledgeParcels(req, res) {
    try {
      const { parcelid, apartment_id } = req.params;
      if ((!parcelid, !apartment_id)) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const role = await getRole(req.id, apartment_id);
      if (!role) {
        return res.status(400).json({
          message: "Not a member of the apartment",
        });
      }
      const parcel = await Parcel.findOne({
        apartment_id: apartment_id,
        _id: apartment_id,
      });
      parcel.status = "Acknowledged";
      await parcel.save();
      return res.status(200).json({
        message: "The package has been acknowledged",
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching parcels", error });
    }
  }
  async removeAckParcels(req, res) {
    try {
      const { apartment_id } = req.body;

      if (!apartment_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const isvalid = isVerified(req.id, apartment_id, "Security");
      if (!isvalid) {
        return res.status(400).json({
          message: "Not allowed to perform this action",
        });
      }
      await Parcel.deleteMany({
        apartment_id,
        status: "Acknowledged",
      });
      return res.status(200).json({
        message: "Ack Parcels removed already",
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching parcels", error });
    }
  }
}

module.exports = LogController;
