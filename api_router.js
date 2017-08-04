var express = require('express');
var user    = require('./api/user');
var post    = require('./api/post');
var middlewares = require('./api/middlewares');
var router  = express.Router();

router.post('/user/new', user.new);             // 增加新用户
router.post('/user/login', user.login);         // 站内登录
router.post('/user/islogin', user.isLogin);     // 返回登录状态
router.post('/user/edit', user.edit);           // 修改资料
router.post('/user/avatar', user.uploadAvatar); // 上传头像

// 帖子 授权后才能进入
router.post('/post/upload', post.uploadImg);    // 上传帖子图片
router.post('/post/new', middlewares.auth, post.uploadTopic);     // 上传帖子
router.post('/post/addreply', middlewares.auth, post.addReply);   // 给一条帖子留言
router.post('/post/like', middlewares.auth, post.like);           // 喜欢一条帖子

// 不用授权也可以进入
router.get('/post/notpass', post.notpass);      // 返回一条还没有审核的帖子
router.post('/post/pass', post.pass);           // 帖子通过数加一
router.post('/post/notpass', post.notPass);     // 帖子不通过数加一
router.post('/post/getreply', post.getReply);   // 获取帖子的留言

module.exports = router;