const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET = process.env.SECRET;

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

// @Route   POST /api/v1/user/register
// @Desc    Register a new user
// @Access  Public

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userAlreadyExists = await User.findOne({ where: { email } });

    if (userAlreadyExists) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Entered email is already in use",
        },
      });
    } else if (!validateName(name)) {
      return res.status(400).json({
        status: "fail",
        data: {
          message:
            "Name must be at least 3 characters long and must contain only letters",
        },
      });
    } else if (!validateEmail(email)) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Please enter a valid email address",
        },
      });
    } else if (!validatePassword(password)) {
      return res.status(400).json({
        status: "fail",
        data: {
          message:
            "Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));

    const user = {
      email,
      name,
      password: hashedPassword,
    };

    const createdUser = await User.create(user);

    return res.status(201).json({
      status: "success",
      data: {
        newUser: {
          id: createdUser.dataValues.id,
          name: createdUser.dataValues.name,
          email: createdUser.dataValues.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

// @Route   POST /api/v1/user/login
// @Desc    Login a user
// @Access  Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length === 0) {
      return res
        .status(400)
        .json({ status: "fail", data: { message: "Please enter your email" } });
    }

    if (password.length === 0) {
      return res.status(400).json({
        status: fail,
        data: { message: "Please enter your password" },
        err: "Please enter your password",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "User not found",
        },
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Incorrect password",
        },
      });
    }

    const payload = { user: { id: existingUser.dataValues.id } };
    const bearerToken = await jwt.sign(payload, SECRET, {
      expiresIn: "2",
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    console.log("Logged in successfully");

    return res.status(200).json({
      status: "success",
      data: {
        message: "Signed In Successfully!",
        bearerToken: bearerToken,
        newUser: {
          id: existingUser.dataValues.id,
          name: existingUser.dataValues.name,
          email: existingUser.dataValues.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

// @Route   GET /api/v1/user/logout
// @Desc    Logout a user
// @Access  Public

const logoutUser = (req, res) => {
  try {
    res.clearCookie("t");
    return res.status(200).json({
      status: "success",
      data: { message: "Signed Out Successfully!" },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      data: { message: err.message },
    });
  }
};

module.exports = { createUser, loginUser, logoutUser };
