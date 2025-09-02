import JWT from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // remove the extra space in " authorization"
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        req.user = decode; // here instead of putting the req.body we use req.user and then decode the data.
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in AUTH API",
      error,
    });
  }
};

export default authMiddleware;
