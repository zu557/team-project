import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
};
