import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.module.js";
import { User } from "../models/user.module.js";

export const getUserforSlider = async (req, res) => {
  try {
    const loggininUserId = req.user._id;
    const all_users = await User.find({ _id: { $ne: loggininUserId } }).select(
      "-password"
    );
    res.status(200).json(all_users);
  } catch (error) {
    console.log("Error in getUsersforsidbar: ", error.message);
    res.status(400).json({ error: "server error" });
  }
};

export const getMessages = async (req, rep) => {
  try {
    //getMessages nake name of id
    const { id: userTochatId } = req.params;
    const myid = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myid, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myid },
      ],
    });
    rep.status(200).json(messages);
  } catch (error) {
    console.log("Error in getUsersforsidbar: ", error.message);
    res.status(400).json({ error: "server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let iamgeUrl;
    if (image) {
      //upload image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      iamgeUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: iamgeUrl,
    });

    await newMessage.save();
    res.status(200).json(newMessage);

    //with socket io
  } catch (error) {
    console.log("Error in getUsersforsidbar: ", error.message);
    res.status(400).json({ error: "server error" });
  }
};
