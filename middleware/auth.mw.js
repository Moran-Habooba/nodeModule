const jwt = require("jsonwebtoken");
const chalk = require("chalk");

// function authorize(req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token) {
//     res.status(401).send("Access denied. No token provided.");
//     return;
//   }

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid token.");
//   }
// }

// module.exports = {
//   authorize,
// };

function authorize(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(chalk.red("JWT payload:", payload));
    req.user = payload;

    if (payload.role) {
      if (payload.role === "admin") {
        req.isAdmin = true;
      }

      if (payload.role === "business") {
        req.isBusiness = true;
      }
    }

    next();
  } catch (err) {
    console.error(chalk.red("Token verification error:", err));
    res.status(400).send("Invalid token.");
  }
}

module.exports = {
  authorize,
};
