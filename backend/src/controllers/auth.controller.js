import { generatetoken } from "../lib/utils.js";
import { User } from "../models/user.module.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { StreamClient } from "@stream-io/node-sdk";

export const sign_up = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(200).json({ message: "all the fields requered" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password have six caracere" });
    }

    const user = User.findOne({ email }).countDocuments();
    if (user > 0) {
      return res.status(400).json({ message: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullname, email, password: hashpassword });
    if (newUser) {
      await newUser.save();
      res.status(200).json({
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilepic: newUser.profilepic,
        password: newUser.password,
        token: generatetoken(newUser._id, res),
      });
    } else {
      return res.status(400).json({ message: "invalide data" });
    }
  } catch (err) {
    console.log("error in signup controller ", err.message);
    return res.status(500).json({ message: "server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const Crt_pass = await bcrypt.compare(password, user.password);

    if (!user || !Crt_pass) {
      return res.status(400).json({ message: "field login" });
    }
    return res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic || "",
      token: generatetoken(user._id, res),
    });
  } catch (err) {
    console.log("error in login controller ", err.message);
    return res.status(500).json({ message: "server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logOut successe" });
  } catch (err) {
    return res.status(400).json({ message: "server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "profile required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true },
    ); 
    res.status(200).json(updateUser);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server errorss" });
  }
};

export const call = async (req, res) => {
  try {
    const apikey = process.env.APIKEY;
    const callId = "rWN6s6vwIqhXEFsTi0mxB";
    const user = req.user;

    const serverClient = new StreamClient(process.env.APIKEY, process.env.APISECRET);

    const token = serverClient.generateUserToken({ user_id: user._id.toString() });

    res.status(200).json({ callId, token, apikey });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "server errorss" });
  }
};
