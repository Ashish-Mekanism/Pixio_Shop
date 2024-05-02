import bcrypt from "bcrypt";
import UserModel from "../../models/userModel.js";
import GenerateAccessToken from "../../utils/genrates_token.js";

export const registration = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    const isExists = await UserModel.findOne({
      email: userData.email,
    });

    if (isExists) {
      return res.status(401).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
      ...userData,
      email: userData.email,
      password: hashedPassword,
    });

    const token = GenerateAccessToken(createdUser._id);

    const userWithToken = {
      ...createdUser.toJSON(),
      token,
    };

    delete userWithToken.password;

    res.status(201).json(userWithToken);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
