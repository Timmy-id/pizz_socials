import mongoose from 'mongoose';
import PostModel from '../Models/postModel.js';
import UserModel from '../Models/userModel.js';

// create a new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json('new post created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json('post does not exist');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('post updated');
    } else {
      res.status(403).json('access denied');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json('post deleted successfully');
    } else {
      res.status(403).json('access denied');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// like and dislike a post
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('post liked');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('post unliked');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId });
    const followingUsersPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingUsersPosts',
        },
      },
      {
        $project: {
          followingUsersPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingUsersPosts[0].followingUsersPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
