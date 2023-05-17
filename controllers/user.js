import { User } from "../models/user.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { sendCookies } from "../utils/feature.js";
config({
  path: "./data/config.env",
});

export const getAllUser = async (req, res) => {
  console.log(req.query);

  const users = await User.find({});

  res.json({
    sucess: true,
    users,
  });
};

export const Login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
  console.log(req.body);
  let user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));


  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

  sendCookies(user, res, `welcome back ${user.name}`);
  } catch (error) {
    next(error)
  }
  
};

export const Register = async (req, res,next) => {
 try {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
 
  if (user) return next(new ErrorHandler("User Already Exist", 400));
  const hashedpassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name: name,
    email: email,
    password: hashedpassword,
  });
  //const  message ="created";
  sendCookies(user, res, message);
 } catch (error) {
  next(error)
 }
  
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    mesage: true,
    user: req.user,
  });
};

export const Logout =  (req, res) => {

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
      secure:process.env.NODE_ENV ==="Development" ?false:true
    })
    .json({
      sucess: true,
      user: req.user,
    });

};
export const userById = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.findById(id);
  res.json({
    sucess: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.json({
    sucess: true,
    message: "updated",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
 
  const user = await User.findById(id);
  await user.remove();
  return;
};
