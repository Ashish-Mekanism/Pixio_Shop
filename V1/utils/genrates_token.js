import jwt from "jsonwebtoken";

const GenerateAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
};

export default GenerateAccessToken;
