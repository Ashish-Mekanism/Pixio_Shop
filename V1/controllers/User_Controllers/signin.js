import bcrypt from "bcrypt";
import UserModel from "../../models/userModel.js";
import GenerateAccessToken from "../../utils/genrates_token.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    delete user._doc.password;
    res.json({ ...user.toJSON(), token: GenerateAccessToken(user._id) });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
