const db = require('../config/mongoose');
const userCollection = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'SignIn' });
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'SignUp' });
}
module.exports.profile = function (request, response) {
    return response.render('profile', { title: 'Profile' });
}

module.exports.add = async function (request, response) {
    if (request.body.password != request.body.confirm_password) return response.redirect('back');
    await userCollection.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }).then((result) => {
        console.log("User Added succesfully");
        return response.redirect('/user/signIn');
    }).catch( function (err){
            console.log("User Already Exists");
            return response.redirect('back');
        });
}