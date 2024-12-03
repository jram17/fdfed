const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getPosts, likePost, addComment } = require('../Controllers/PostController');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'cposts/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post('/', upload.single('file'), createPost);
router.get('/', getPosts);
router.post('/:postId/like', likePost);
router.post('/:postId/comment', addComment);

module.exports = router;
