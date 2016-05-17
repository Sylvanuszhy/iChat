/**
 * Created by Sylvanus on 5/14/16.
 */

var userList = [];

function addUser(uid) {
    var index = findUser(uid);
    if (index == -1) {
        userList.push({uid: uid, socket: null});
    }
    console.log(userList);
}

function setSocket(uid, socket) {
    var index = findUser(uid);
    if (index != -1) {
        userList[index].socket = socket;
    }
    console.log(userList);
}

function userOfID(uid) {
    var index = findUser(uid);
    if (index == -1) {
        return null;
    } else {
        return userList[index];
    }
}

function findUser(uid) {
    var index = -1;
    for (var i = 0; i<userList.length; i++) {
        if (userList[i].uid == uid) {
            index = i;
        }
    }
    return index;
}

module.exports.addUser = addUser;
module.exports.setSocket = setSocket;
module.exports.userOfID = userOfID;