/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("answered on process " + process.env.NODE_WORKER_ID);
  res.render('index', { title: 'Express' })
};