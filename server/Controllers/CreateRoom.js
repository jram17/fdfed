

class CreateRoom {
    async getRequest(req, res) {
        return res.status(200).json({ message: "Authenticated successfully" });
    }
}

module.exports = CreateRoom;