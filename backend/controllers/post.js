const fs = require("fs");
const { validationResult } = require('express-validator');
const Post = require("../models/Post");

function deleteImage(imageUrl, callback) {
    const filename = imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
        callback();
    });
}

function removeItem(arr, value) {
    return arr.filter(it => it !== value);
}

function removeFromDislikes(post, userId) {
    const usersDisliked = removeItem(post.usersDisliked, userId);
    if (usersDisliked.length < post.usersDisliked.length) {
        post.usersDisliked = usersDisliked;
        post.dislikes--;
    }
}

function removeFromLikes(post, userId) {
    const usersLiked = removeItem(post.usersLiked, userId);
    if (usersLiked.length < post.usersLiked.length) {
        post.usersLiked = usersLiked;
        post.likes--;
    }
}

function addToDislikes(post, userId) {
    post.usersDisliked.push(userId);
    post.dislikes++;
}

function addToLikes(post, userId) {
    post.usersLiked.push(userId);
    post.likes++;
}

exports.getPosts = (req, res) => {
    Post.find()
        .sort({ _id: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getPost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.addPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const post = new Post({
        userId: req.auth.userId,
        text: req.body.text,
        imageUrl: req.imageUrl,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });

    post.save()
        .then(() => res.status(201).json({ message: "Post created" }))
        .catch(error => res.status(400).json({ error }));
};

exports.updatePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.auth.role !== "admin" && post.userId != req.auth.userId) {
                res.status(403).json({ message: "Not authorized to modify post created by another user" });
            } else {
                const savePost = () => {
                    Post
                        .updateOne(
                            { _id: req.params.id },
                            {
                                text: req.body.text,
                                imageUrl: req.imageUrl
                            }
                        )
                        .then(() => res.status(200).json({ message: "Post updated" }))
                        .catch(error => res.status(400).json({ error }));
                }

                if (req.imageUrl !== undefined) {
                    deleteImage(post.imageUrl, savePost);
                } else {
                    savePost();
                }
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.auth.role !== "admin" && post.userId != req.auth.userId) {
                res.status(403).json({ message: "Not authorized to delete post created by another user" });
            } else {
                deleteImage(post.imageUrl, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Post deleted" }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.updateLikePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const userId = req.auth.userId;
            const save = true;

            removeFromLikes(post, userId);
            removeFromDislikes(post, userId);

            if (req.body.like == 1) {
                addToLikes(post, userId);
            } else if (req.body.like == 0) {
                // Do nothing
            } else if (req.body.like == -1) {
                addToDislikes(post, userId);
            } else {
                save = false;
                res.status(400).json({ message: "Value for like is invalid" });
            }

            if (save) {
                Post
                    .updateOne(
                        { _id: req.params.id },
                        {
                            likes: post.likes,
                            dislikes: post.dislikes,
                            usersLiked: post.usersLiked,
                            usersDisliked: post.usersDisliked
                        }
                    )
                    .then(() => res.status(200).json({ message: "Post updated" }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};
