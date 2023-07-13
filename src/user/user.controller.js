import bcript from "bcryptjs";
import { userModel } from "./user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userModel.create({
      username,
      email,
      password: bcript.hashSync(password, 10),
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    return res.json({
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne(email);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = bcript.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.json({
      token,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

export const userController = {
  register,
  login,
};
