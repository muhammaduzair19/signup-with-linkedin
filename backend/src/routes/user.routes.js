import express from "express";

const userRoutes = express.Router();

const userController = (req, res) => {
    res.send("HELLO IM USER");
};
userRoutes.route("/linkedin").get(userController);


export default userRoutes;
