// import command de prisma
const prisma = require("../lib/prisma");
// import module
const bcrypt = require("bcrypt"); // hash password
const jwt = require("jsonwebtoken"); // sign requests with token

// New User + Stock hash password
const userRegistration = async (req, res, next) => {
  const { email, name, surname } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // permet lors de la réponse user de ne pas inclure le password
  try {
    const { password, ...user } = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
      },
    });
    console.log(`User Created`);
    res.json(user);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};

// User Loggin
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  //  localStorage.setItem("userEmail", email);

  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  // User exist ?
  if (!user) {
    return res.status(400).json({ error: "No User Found" });
  }
  // Password correct ?
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ error: "Wrong Password" });
  }
  // Response with JWT - 24h token permission
  else {
    res.status(200).json({
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    });
    console.log("UserId", user.id, "Connected");
  }
};

// Delete 1 User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.id !== req.user.id && req.user.role === "USER") {
    return res.status(403).json({ message: "Interdit" });
  }
  const result = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Delete user Id:", id);
  res.json(result);
};

// Get 1
const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.id !== req.user.id && req.user.role === "USER") {
    return res.status(403).json({
      message: "Interdit",
    });
  }

  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      name: true,
      surname: true,
      email: true,
    },
  });

  res.json(result);
};

// Get Me - userId ajouté dans le liens front via => ?? le local storage
const getMe = async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      where: { id: userId },
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.id !== req.user.id && req.user.role === "USER") {
    return res.status(403).json({
      message: "Interdit",
    });
  }

  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      name: true,
      surname: true,
      email: true,
    },
  });

  res.json(result);
};

// export all controllers
module.exports = {
  userRegistration,
  userLogin,
  deleteUser,
  getOneUser,
  getMe,
};
