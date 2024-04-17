import mongoose from "mongoose";

const { Schema } = mongoose;

const IUser = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // role: { type: String, required: true, default: "buyer" },
  // store_name: { type: String },
});

IUser.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const UserModel = mongoose.model("User", IUser);
export default UserModel;
