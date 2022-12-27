const jwt = require("jsonwebtoken");

const asyncHandler = require("./async");
const ErrorHandler = require("../util/errorres");
const { User } = require("../model/User");
const Role = require("../model/Role");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //* set token from bearer
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    //* set token from cookies
    token = req.cookies.token;
  } else {
    return next(new ErrorHandler(401, `Unauthorized to access for this route`));
  }

  //* make sure token exit
  if (!token) {
    return next(new ErrorHandler(401, `Unauthorized to access for this route`));
  }

  try {
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "asdf123479890jasldfkj"
    );

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorHandler(401, `Unauthorized to access for this route`));
  }
});

//* check role authorized
exports.authorize = (key, action) => {
  return async (req, res, next) => {
    if (req.user.roleId) {
      const roleDetails = await Role.findById(req.user.roleId).populate(
        "permissions"
      );

      if (roleDetails.type === "superAdmin") {
        next();
      } else {
        let obj = roleDetails.permissions.find(
          (x) => x.key === key && x.action === action
        );

        if (!obj) {
          return next(
            new ErrorHandler(
              403,
              `${roleDetails.type} role is not unauthorized for this action`
            )
          );
        }
        next();
      }
    } else {
      next();
    }
  };
};
