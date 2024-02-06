import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(), //pattern(new RegExp(/^[A-Za-z0-9] {3, 30}$/)).
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(), //pattern(new RegExp(/^[0-9]{10}$/)).
  dateOfBirth: Joi.string().isoDate().required(),
});

export const registerUser = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    fullName,
    address,
    phoneNumber,
    dateOfBirth,
  } = req.body;
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { ...value, password: hashedPassword };

  try {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(userData);

    await userRepository.save(newUser);

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Could not register user", err });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: "Could not find users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { userID: parsedId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "Could not fetch user", err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = parseInt(id); // Parse id to ensure it's a number
  const {
    username,
    email,
    password,
    fullName,
    address,
    phoneNumber,
    dateOfBirth,
  } = req.body;
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { userID: parsedId } }); // Pass parsedId to findOne
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    userRepository.merge(user, {
      username,
      email,
      password,
      fullName,
      address,
      phoneNumber,
      dateOfBirth,
    });
    await userRepository.save(user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ error: "Could not update user", err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { userID: parsedId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userRepository.remove(user);
    res.status(204).json({ message: "User removed successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Could not delete the user", err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.userID, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const tokenWithBearer = `Bearer ${token}`;
    res.set("Authorization", tokenWithBearer);
    res.status(200).json({ token: tokenWithBearer });
    console.log(tokenWithBearer);
  } catch (err) {
    res.status(400).json({ message: "Could not sign in", err });
  }
};

export const protectedHandler = (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    res
      .status(200)
      .json({ message: "Protected route accessed successfully", user });
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
