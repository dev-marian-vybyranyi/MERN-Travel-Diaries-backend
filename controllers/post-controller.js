import Post from "../models/Post";

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find().populate("user");
  } catch (err) {
    return console.log(err);
  }

  if (!posts) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }

  return res.status(200).json({ posts });
};
