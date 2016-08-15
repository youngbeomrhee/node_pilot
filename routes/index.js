var express = require('express');
var router = express.Router();
var fs = require('fs');
var root = __dirname;   // node.js에서 제공하는 매직변수. 파일의 root 디렉토리 경로를 가지고 있다.

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download/with/a', function(req, res, next) {
  res.render('download/with/a', { title: 'File download test' });
});

router.get('/download/file', function(req, res, next) {
  console.log(root);
  fs.readFile(root+'/../public/files/test.xlsx', function (err, data) {
    if (err) throw err;
    // console.log(data);
    // res.writeHead(202,{
    //   'filename': '품목정보.xlsx',
    //   'Content-Type': 'application/force-download',
    //   'Content-Transfer-Encoding': 'binary',
    //   'Content-Length': Buffer.byteLength(data)
    // });
    /*
    res.writeHead(202,{
        'filename': '품목정보.xlsx'
      });
    res.end(data);
    */
    res.writeHead(200, {
      // "Content-Type": "application/vnd.ms-excel",
      "Content-Type": "application/octet-stream",
      "Content-Disposition" : "attachment; filename="+encodeURI('품목정보.xlsx')});
    fs.createReadStream(root+'/../public/files/test.xlsx').pipe(res);
  });
  // res.render('download/with/a', { title: 'File download test' });
});
module.exports = router;
