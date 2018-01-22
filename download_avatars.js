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
  request(options, function(err, res, body) {
    cb(err, body)
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("errors:", err);
  console.log("result:", result);
})

// reminder: cb or callbacks in node expect their first argument
//to be a placeholder for any errors