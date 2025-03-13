const crypto = require("crypto");

class checkJwt {
  async getRequest(req, res) {
    const csrfToken = crypto.randomBytes(32).toString("hex"); // Generate a secure token
    res.clearCookie('csrfToken');
    res.cookie("csrfToken", csrfToken, {
      httpOnly: true,
      sameSite: "Strict",
    });
    res
      .status(200)
      .send({
        username: req.userDetails.username,
        email: req.userDetails.email,
        uuid: req.userDetails.uuid,
        csrfToken
      });
  }
}

module.exports = checkJwt;
