import { TUserRole } from "../GlobalInterfaces/global.userRole";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "./catchAsync";
import config from "../config";
import { userModel } from "../modules/User/user.model";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Use 'authorization' header with Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token after 'Bearer '

    let decode: JwtPayload;

    try {
      decode = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const { email, role } = decode;

    const user = await userModel.isUserExists(email);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ message: "This user is blocked" });
    }

    if (roles.length > 0 && !roles.includes(role)) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // Attach user info to request
    //@ts-ignore
    req.user = decode;

    next();
  });
};

export default auth;
