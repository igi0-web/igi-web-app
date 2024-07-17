import jwt from "jsonwebtoken";

const generateToken = (res, admin) => {
  const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET);
  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS environment)
      sameSite: 'None', // Recommended to prevent CSRF attacks
      path: '/',
    })
    .json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone
    });
};

export default generateToken;
