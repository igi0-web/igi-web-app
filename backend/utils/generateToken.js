import jwt from "jsonwebtoken";

const generateToken = (res, admin) => {
  const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET);
  res
    .cookie("jwt", token, {
      httpOnly: true,
    })
    .json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone
    });
};

export default generateToken;
