import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const KEY = "myjwtsecret";
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    res.status(200).json({
      token: jwt.sign({ email }, KEY, {
        expiresIn: "1d",
      }),
    });
  }
}
