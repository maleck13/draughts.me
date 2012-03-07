/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(res.render);  
  res.render('index', { title: 'Express' })
};