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
   profilePicture:{
    type : String,
    default : "https://res.cloudinary.com/dihxiv8cj/image/upload/v1686043303/user_b6wyms.png",
    required : true
   },
    coverPicture: {
      type : String,
      default : "https://res.cloudinary.com/dihxiv8cj/image/upload/v1689271208/coverpic_dg3dmu.png",
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
