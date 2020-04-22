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

const calculateWfhDays = (initialStartDate) => {
  const now = new Date();
  const differenceInTime = now.getTime() - initialStartDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

const wfhDays = calculateWfhDays(new Date("2020-03-11"));
const otherWfhDays = calculateWfhDays(new Date("2020-03-12"));

const text = "Daily WFH report";
const blocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text
    }
  },
  {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*𝗗aniel*\nDay ${otherWfhDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗝ohan*\nDay ${wfhDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗝onathan*\nDay ${otherWfhDays}`
      },
      {
        type: "mrkdwn",
        text: `*𝗩init*\nDay ${wfhDays}`
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
