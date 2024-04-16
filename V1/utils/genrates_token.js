import jwt from "jsonwebtoken";

const GenerateAccessToken = (email) => {
  return jwt.sign({ email }, "Ecom_token", { expiresIn: "1d" });
};

export default GenerateAccessToken;
