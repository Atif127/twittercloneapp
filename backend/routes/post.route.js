import express from 'express';
import { protectRoute } from '../middleware/protectroute.js';
import { createPost, deletePost, commentOnPost, likeunlikePost, getAllPosts, getLikedPosts, getFollwingPosts, getUserPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/all',protectRoute, getAllPosts);
router.get('/following', protectRoute, getFollwingPosts);
router.get('/likes/:id', protectRoute, getLikedPosts);
router.get('/user/:username', protectRoute, getUserPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likeunlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost);

export default router;