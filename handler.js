"use strict";

const http = require("https");

const post = (path, payload) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: "hooks.slack.com",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      path
    };
    const req = http.request(options, (res) => {
      let buffer = "";
      res.on("data", (chunk) => (buffer += chunk));
      res.on("end", () => resolve());
    });
    req.on("error", (e) => reject(e.message));
    req.write(JSON.stringify(payload));
    req.end();
  });

const initialStartDate = new Date("2020-03-11");
const now = new Date();
const differenceInTime = now.getTime() - initialStartDate.getTime();
const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
const otherDifferenceInDays = differenceInDays - 1;

const text = "Daily WFH report";
const blocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Daily WFH report:"
    }
  },
  {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*𝗗aniel*\nDay ${otherDifferenceInDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗝ohan*\nDay ${differenceInDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗝onathan*\nDay ${otherDifferenceInDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗩init*\nDay ${differenceInDays}`
      }
    ]
  }
];

module.exports.b2w = async (event) => {
  await post(process.env.SLACK_PATH, {
    text,
    blocks
  });

  return {
    message: "B2W message posted successfully!",
    event
  };
};
