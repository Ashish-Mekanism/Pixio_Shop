import jwt from "jsonwebtoken";

const GenerateAccessToken = (_id) => {
  return jwt.sign({ _id }, "Ecom_token", { expiresIn: "15d" });
};

export default GenerateAccessToken;
