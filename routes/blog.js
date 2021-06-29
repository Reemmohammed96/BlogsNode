const express = require('express');
const { create, getAll, getBytitle, update, deleteOne ,getfollowingblogs, unlikeBlog ,getUserBlogs,likeBlog,getBlogs, getmyblog, createcomment, like } = require('../controllers/blog')
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const app = express();


const mongoose = require('mongoose')
const Blog = require('../models/blogs')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const filterFile = (req, res, cb) => {
    if (file.mimetype === 'image') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage })

/*router.get('/', async (req, res, next) => {
  try {
    const user = await getAll(); 
    res.json(user);
  } catch (e) {
    next(e);
  }
});*/
router.post('/add', upload.single('blogImg'), async(req, res, next) => {
    const { body, file, user: { id, username, userImg } } = req
    body.blogImg = file?.path
    try {
        const user = await create({...body, userId: id, Author: username, authorImg: userImg });
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.post('/comment/:blogid', async(req, res, next) => {
    debugger
    let { body, user: { id, username, userImg }, params: { blogid } } = req
    console.log(body)
    try {
        const user = await createcomment({...body, AuthorId: id, AuthorImg: userImg, AuthorName: username }, blogid)
        res.json(user);
    } catch (e) {
        next(e)
    }
});
router.post('/like/:blogid', async(req, res, next) => {
    debugger
    let { user: { id }, params: { blogid } } = req
    try {
        const user = await likeBlog(id,blogid)
        res.json(user);
    } catch (e) {
        next(e)
    }
});
router.post('/unlike/:blogid', async(req, res, next) => {
    debugger
    let { user: { id }, params: { blogid } } = req
    try {
        const user = await unlikeBlog(id,blogid)
        res.json(user);
    } catch (e) {
        next(e)
    }
});

/*router.post('/', upload.single('product'),async (req, res, next) => { 
     const { body ,user:{ id }} = req;
    try {
      const user = await create({...body,userId:id});
      res.json(user);
    } catch (e) {
      next(e);
    }
  });*/
router.get('/', async(req, res, next) => {
    const { user: { id } } = req
    try {
        const user = await getAll({ userId: id });
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.get('/followingBlogs',async(req,res,next)=>{
    const { user: { id } } = req
    try{
        const blogs=await getfollowingblogs({ userId: id },req.user.following)
        res.json(blogs)
    }catch(e){
        next(e);
    }
})
router.get('/userBlogs/:id',async(req,res,next)=>{
    const { params: { id } }=req
    try{
        const user=await getUserBlogs(id);
        res.json(user);
    }catch(e){
        next(e);
    }
})
router.get('/:id', async(req, res, next) => {
    const { params: { id } } = req 
    try {
        const user = await getmyblog(id);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.get('/search/:title', async(req, res, next) => {
    const { params: { title } } = req
    try {
        const user = await getBytitle(title);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.patch('/:ids', upload.single('blogImg'),async(req, res, next) => {
    debugger
    const { params: { ids }, body, user: { id },file } = req
    body.blogImg = file?.path

    try {
        const user = await update(ids, body, id);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.delete('/:blogid', async(req, res, next) => {
    debugger
    const { params: { blogid }, user: { id } } = req;
    try {
        const users = await deleteOne(blogid, id);
        res.json(users);
    } catch (e) {
        next(e);
    }
});

module.exports = router;