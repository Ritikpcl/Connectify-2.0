import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   profilePicture:{
    type : String,
    default : "https://res.cloudinary.com/dihxiv8cj/image/upload/v1686043303/user_b6wyms.png",
    required : true
   },
    coverPicture: {
      type : String,
      default : "https://asset.cloudinary.com/dihxiv8cj/f7ca52cb2d61e0e96d9d15677a16d33a",
      required : true
     },
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
