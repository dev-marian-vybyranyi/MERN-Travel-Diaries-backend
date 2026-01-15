import mongoose from "mongoose";
import dotenv from "dotenv";
import { hashSync } from "bcryptjs";
import User from "./models/User";
import Post from "./models/Posts";

dotenv.config();

const usersData = [
  {
    name: "Alex Smith",
    email: "alex@example.com",
    password: "password123",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Wilson",
    email: "jane@example.com",
    password: "password123",
  },
];

const postsData = [
  {
    title: "A week in Tokyo",
    description:
      "The bright lights and amazing food of Shinjuku and Shibuya were unforgettable.",
    image:
      "https://images.unsplash.com/photo-1540959733332-e94e7bf0bd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Tokyo, Japan",
    date: "2023-10-15",
    userEmail: "alex@example.com",
  },
  {
    title: "Mountains of Switzerland",
    description:
      "Hiking in the Swiss Alps was a breath of fresh air. The views were spectacular.",
    image:
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Zermatt, Switzerland",
    date: "2023-08-20",
    userEmail: "alex@example.com",
  },
  {
    title: "Safari in Kenya",
    description:
      "Witnessing the Big Five in their natural habitat was a life-changing experience.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Maasai Mara, Kenya",
    date: "2023-07-10",
    userEmail: "john@example.com",
  },
  {
    title: "Paris at Night",
    description:
      "The City of Light truly comes alive after dark. The Eiffel Tower was glowing.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Paris, France",
    date: "2023-11-05",
    userEmail: "jane@example.com",
  },
  {
    title: "Beaches of Bali",
    description:
      "Relaxing on the pristine sands of Uluwatu was the perfect getaway.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Bali, Indonesia",
    date: "2023-09-12",
    userEmail: "jane@example.com",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.5whbtes.mongodb.net/?appName=Cluster0`
    );
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Cleared existing Users and Posts.");

    // Create Users
    const createdUsers = [];
    for (const u of usersData) {
      const user = new User({
        ...u,
        password: hashSync(u.password),
        posts: [],
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${savedUser.name}`);
    }

    // Create Posts
    for (const p of postsData) {
      const user = createdUsers.find((u) => u.email === p.userEmail);
      if (user) {
        const post = new Post({
          title: p.title,
          description: p.description,
          image: p.image,
          location: p.location,
          date: new Date(p.date),
          user: user._id,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        user.posts.push(post);
        await user.save({ session });
        await post.save({ session });
        await session.commitTransaction();
        session.endSession();
        console.log(`Created post: ${post.title} for user: ${user.name}`);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
