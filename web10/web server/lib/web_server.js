'use strict';
var http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url'),
      querystring = require('querystring');
var __dir_path = '../public';

var server = http.createServer(function(request, response) {
  handleRequest(request, response);
}).listen(8000);

console.log("Server is listening");

//analyze what the request is and give response
function handleRequest(request, response) {
  var pathname = parseName(request.url);
  var query = parseQuery(request.url);
console.log(pathname);
  if (pathname === '/image/favicon.ico') 
  {
    response.end();
    return ;
  }
  if (pathname === '/image/background1.png') {
    var file_path = __dir_path + pathname;
    fs.readFile(file_path, 'binary', function(error, file) {
      if (error)
      {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('error');
      }
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(file, 'binary');
      response.end();
    });
  }
  else if (pathname === '/stylesheet/style.css') {
    var file_path = __dir_path + pathname;

    fs.readFile(file_path, 'utf-8', function(error, file) {
      if (error)
      {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('error');
      }
      response.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'});
      response.write(file, 'utf-8');
      response.end();
    });
  }
  else if (pathname === '/'){
    if (query.username === undefined || !isExistByName(query.username)) {
      console.log("signup page");
      var file_path = __dir_path + '/html/index_signup.html';
      writeHtml(file_path, response);
      //because
    }
    else {
      console.log("info paga");
      var file_path = __dir_path + '/html/index_info.html';
      writeHtml(file_path, response);
    }
  }
  else if (pathname === '/javascript/event.js' 
    || pathname === '/jQuery/jquery-3.2.1.min.js') {
    var file_path = __dir_path + pathname;

    fs.readFile(file_path, 'utf-8', function(error, file) {
      if (error)
      {
        console.log(error);
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('error');
      }
      else {
        response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'});
        response.write(file, 'utf-8');
        response.end();
      }
    });
  }
  else if (pathname === '/postdata') {
    var urlstr = '';
    
    request.on('data', function(data) {
      urlstr += data;
    });

    request.on('end', function(){
      var jsonData = querystring.parse(urlstr.toString());
      
      var flag = isExist(jsonData);
      if (flag === "") {
        var file_path = __dir_path + '/html/index_info.html';
        writeHtml(file_path, response);  
        writeToFlie(jsonData);
      }
      else
        response.end(flag);//post message to js :  the user is exist
    });
  }
  else if (pathname === '/requestdata') {
    var urlstr = '';
    
    request.on('data', function(data) {
      urlstr += data;
    });

    request.on('end', function(){
      console.log(urlstr);
      if (isExistByName(urlstr)) {
        response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        response.write(JSON.stringify(getInfoByName(urlstr)));
        response.end();
      }
      else
      {
        response.end("fail");
        //post message to js :  the user is exist
      }
    });
  }
  else {
    var file_path = __dir_path + '/html/index_info.html';
    writeHtml(file_path, response);
  }
}

function writeToFlie(jsonData) {
  console.log(jsonData);
  var file_path = __dir_path + "/json/userInfo.json";
  var jsonObj = JSON.parse(fs.readFileSync(file_path, 'utf-8'));

  jsonObj.push(jsonData);

  fs.writeFileSync(file_path, JSON.stringify(jsonObj));
}

function isExist(targetInfo) {
  var file_path = __dir_path + '/json/userInfo.json';
  // console.log(fs.readFileSync(file_path, 'utf-8'));
  var userInfo = JSON.parse(fs.readFileSync(file_path, 'utf-8'));

  for(var j in userInfo) {
    if (userInfo[j].name == targetInfo.name)
     return "name";
    else if(userInfo[j].id == targetInfo.id)
      return "id";
    else if(userInfo[j].phone == targetInfo.phone)
      return "phone";
    else if(userInfo[j].mail == targetInfo.mail)
      return "mail";
  }
  return "";
}

function isExistByName(name) {
  var file_path = __dir_path + '/json/userInfo.json';
  // console.log(fs.readFileSync(file_path, 'utf-8'));
  var userInfo = JSON.parse(fs.readFileSync(file_path, 'utf-8'));

  for(var j in userInfo) {
    if (userInfo[j].name == name)
     return true;
  }
  return false;
}

function getInfoByName(username) {
  var file_path = __dir_path + '/json/userInfo.json';
  var userInfo = JSON.parse(fs.readFileSync(file_path));

  var target = {};

  for(var i in userInfo) {
      if (userInfo[i].name == username)
      {
        console.log(userInfo[i].name);
        target = userInfo[i];
      }
  }
  return target;
}

function writeHtml(file_path , response) {
  fs.readFile(file_path, "utf-8", function(error, file) {
    if (error) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('error');
    }
    else {
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(file, 'utf-8');
      response.end();
    }
  });
}

//get the pathname of url
function parseName(_url) {
  return url.parse(_url).pathname;
}

//get the query of url
function parseQuery(_url) {
  return url.parse(_url, true).query;
}

function parseInput(_postdata) {
  return querystring.parse(_postdata);
}

process.on('uncaughtException', function (err) {
  console.error(err.stack);
});