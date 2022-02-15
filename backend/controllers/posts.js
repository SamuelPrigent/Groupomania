// import command de prisma
const prisma = require("../lib/prisma");

// Get All
const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    // le js du front à besoins des id sinon pas de post
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          surname: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(posts);
};

// Get 1
const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          surname: true,
          name: true,
        },
      },
    },
  });

  res.json(post);
};

// New Post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.id, // récupère id dans token request
    },
  });
  console.log("user", req.user.id, "post", req.body.title);
  res.json(result);
};

// Put 1
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  if (post.authorId !== req.user.id && req.user.role === "USER") {
    return res.status(403).json({
      message: "Interdit",
    });
  }
  const result = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  console.log("Modify post Id:", id);
  res.json(result);
};

// Delete 1
const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.authorId !== req.user.id && req.user.role === "USER") {
    return res.status(403).json({ message: "Interdit" });
  }
  const result = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Delete post Id:", id);
  res.json(result);
};

// export all controllers
module.exports = { getPosts, getOnePost, createPost, updatePost, deletePost };
