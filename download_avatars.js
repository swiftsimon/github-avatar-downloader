var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

// console.log("X", process.argv[2]);
// console.log("X", process.argv[3]);
let owner = process.argv[2];
let name = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {

  // require both arguments to run
  if (repoOwner && repoName) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + secrets.GITHUB_TOKEN
      }
  };

  request(options, function(err, res, body) {

    cb(err, res, body)

    //console.log("B", parsed);
    // console.log("C", parsed[0].login);
    // console.log("D", parsed[0].avatar_url);

// console.log the value for each avatar_url
  });
  } else {
      console.log("We require both an owner and name value")
  }
}

    // this is the callback function
function parseData(err, res, body) {
  if (err) {
    console.log('error has occured');
  }
    // parse the JSON string into an object
  let parsed = JSON.parse(body);
// pass this object (an array of contributor objects) to the cb function
// modify the callback function to iterate over results
  for (i = 0; i < parsed.length; i++) {
      downloadImageByURL(parsed[i].avatar_url, "avatars/" + parsed[i].login + ".jpeg");
  }
}

function downloadImageByURL(url, filePath) {
  //make a request to given url
  request.get(url)
    .on('error', function (err) {
      console.log("we have an error");
    })
    .on('response', function(response) {
      console.log('Response Status Code:', response.statusCode);
    })
  // save the resulting image to specified filepath
    .pipe(fs.createWriteStream(filePath));

}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors(owner, name, parseData);
  // console.log("errors:", err);
  // console.log("result:", result);


// reminder: cb or callbacks in node expect their first argument
// to be a placeholder for any errors