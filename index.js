"use strict";
const request = require("request");

const target_url = process.env.TARGET_URL;
const slack_url  = process.env.SLACK_URL;
const channel    = process.env.SLACK_CHANNEL;

function notifyToSlack(msg) {
  console.log("notify: " + msg);
  request({
    method:"POST",
    uri: slack_url,
    json: true,
    body: {
      channel: channel,
      text: msg
    }
  }).on("response", (res) => {
    if (res.statusCode === 200) {
      console.log("Successfully notified.");
    } else {
      console.log("Fail to notify. status_code = " + res.statusCode);
    }
  }).on("error", (err) => {
      console.log("Fail to notify. err = ", err);
  })
}

request({
  method: "GET",
  uri: target_url,
  encoding: "utf-8",
  timeout: 5000
}).on("response", (res) => {
  console.log("request: ", target_url, res.statusCode);
  if (res.statusCode !== 200) {
    notifyToSlack("ResponseCode is not 200: " + res.statusCode + " - " + target_url);
  }
}).on("error", (err) => {
  notifyToSlack("Fail to access " + target_url + ": " + JSON.stringify(err));
});


