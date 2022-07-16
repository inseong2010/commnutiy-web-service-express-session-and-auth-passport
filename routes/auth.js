var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template');
var auth = require('../lib/auth');

router.get('/login', (req, res) => {
    var title = 'WEB - login';
    var list = template.LIST(req.list);
    var html = template.HTML(title, list, `
    <form action="/auth/login" method="post">
        <p><input type="text" name="email" placeholder="email"class="email"></p>
        <p><input type="password" name="pw" placeholder="password"class="pw"></p>
        <p>
            <input type="submit" value="login">
        </p>
    </form>
    `, ''); 
    res.send(html);
});

/* router.post('/login', (req, res) => {
    var post = req.body;
    var email = post.email;
    var pw = post.pw;
     if (email === 'admin' || email === 'skeleton') {
        if (pw === authData.pw) {
            res.send('admin welcome');
        }
    } else  if(email === authData.email && pw === authData.pw) {
        req.session.is_logined = true;
        req.session.nickname = authData.nickname;
        req.session.save();
        res.redirect(`/`);
    } else {
        res.send('hwo?');
    };
}); */ 

router.get('/logout', (req, res) => {
    if (!auth.isOwner(req, res)) {
        res.redirect(`/auth/login`);
        return false;
    }
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
    
});

module.exports = router;