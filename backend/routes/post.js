const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const postCtrl = require("../controllers/post");

function getImageUrl(req) {
    return `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
}

const parse = (req, res, next) => {
    delete req._id;
    delete req._userId;
    if (req.file) {
        req.body = JSON.parse(req.body.post);
        req.imageUrl = getImageUrl(req)
    }
    next();
}

router.get("/", auth, postCtrl.getPosts);
router.get("/:id", auth, postCtrl.getPost);
router.post(
    "/", 
    auth, 
    multer, 
    parse,
    body("text").trim().not().isEmpty().escape(),
    postCtrl.addPost
);

router.put(
    "/:id", 
    auth, 
    multer,
    parse,
    body("text").trim().not().isEmpty().escape(),
    postCtrl.updatePost
);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.updateLikePost);

module.exports = router;
