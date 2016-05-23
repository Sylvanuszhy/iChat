/**
 * Created by Sylvanus on 4/3/16.
 */

var express = require('express');
var router = express.Router();
var Models = require('../../models/models');

router.get('/', function(req, res, next) {
    if (req.session.uid == null) {
        res.redirect('/login');
    }
    var User = Models.User;
    User.find({ email: req.session.uid }, 'friends', function (err, docs) {
        if (docs.length == 1) {
            var groups = [];
            var friends = docs[0].friends;
            friends.forEach(function(element) {
                groups.push(element.group);
            });
            res.render('chat/friend', {
                title: 'Contacts',
                friends: friends,
                groups: groups
            });
        } else {
            console.log('wrong email');
            res.redirect(303, '/login');
        }
    });
});

router.post('/addFriend', function(req, res, next) {
    var User = Models.User;
    User.update({ email: req.session.uid, 'friends.group': req.body.toGroup }, { $push: {'friends.$.items': req.body.newFriend } }, function (err, raw) {
        if (err)
            console.error(error);
        console.log('The raw response from Mongo was ', raw);
        res.json({ newFriend: req.body.newFriend, toGroup: req.body.toGroup });
    });
});

router.post('/addGroup', function(req, res, next) {
    var User = Models.User;
    User.update({ email: req.session.uid }, { $push: { friends: { group: req.body.newGroup, items: [] }}}, function (err, raw) {
        if (err)
            console.error(error);
        console.log('The raw response from Mongo was ', raw);
        res.json({ newGroup: req.body.newGroup });
    });
});

router.post('/changeGroup', function(req, res, next) {
    var User = Models.User;
    User.update({ email: req.session.uid, 'friends.group': req.body.toGroup }, { $push: {'friends.$.items': req.body.uid } }, function (err, raw) {
        if (err)
            console.error(error);
        console.log('The raw response from Mongo was ', raw);
        User.update({ email: req.session.uid, 'friends.group': req.body.fromGroup }, { $pull: {'friends.$.items': req.body.uid } }, function (err, raw) {
            if (err)
                console.error(error);
            console.log('The raw response from Mongo was ', raw);
        });
    });
});

router.post('/deleteFriend', function(req, res, next) {
    var User = Models.User;
    User.update({ email: req.session.uid, 'friends.group': req.body.gid }, { $pull: {'friends.$.items': req.body.uid } }, function (err, raw) {
        if (err)
            console.error(error);
        console.log('The raw response from Mongo was ', raw);
        // one more delete
    });
});

module.exports = router;