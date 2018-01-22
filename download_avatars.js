var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }

  };
  //request(options, function(err, res, body) {
  request(options, function(err, res, body) {

    if (err) console.log('error has occured');
    // parse the JSON string into an object
    let parsed = JSON.parse(body);
    //console.log("B", parsed);
    console.log("C", parsed[0].login);
    console.log("D", parsed[0].avatar_url);

// pass this object (an array of contributor objects) to the cb function
// modify the callback function to iterate over results and
// console.log the value for each avatar_url
    //cb(err, result);


  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("errors:", err);
  // console.log("result:", result);
})

// reminder: cb or callbacks in node expect their first argument
//to be a placeholder for any errors