var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("errors:", err);
  console.log("result:", result);
})

// reminder: cb or callbacks in node expect their first argument
//to be a placeholder for any errors