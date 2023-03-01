module.exports.index = function (request, response) {
    return response.render('home', {title : 'Index'});
}