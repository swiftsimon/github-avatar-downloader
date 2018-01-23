var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

// console.log("X", process.argv[2]);
// console.log("X", process.argv[3]);

function getRepoContributors(/*repoOwner, repoName, cb*/) {

  let owner = process.argv[2];
  let name = process.argv[3];
  if (name && owner) {
    var options = {
      url: "https://api.github.com/repos/" + owner + "/" + name + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if (err) console.log('error has occured');
    // parse the JSON string into an object
    let parsed = JSON.parse(body);
    for (i = 0; i < parsed.length; i++) {
      downloadImageByURL(parsed[i].avatar_url, "avatars/" + parsed[i].login + ".jpeg");
    }
    //console.log("B", parsed);
    // console.log("C", parsed[0].login);
    // console.log("D", parsed[0].avatar_url);

// pass this object (an array of contributor objects) to the cb function
// modify the callback function to iterate over results and
// console.log the value for each avatar_url
  });
    } else {
      console.log("We require both an owner and name value")
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
    .pipe(fs.createWriteStream(filePath));
  // save the resulting image to specified filepath

}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors();
  // console.log("errors:", err);
  // console.log("result:", result);


// reminder: cb or callbacks in node expect their first argument
//to be a placeholder for any errors