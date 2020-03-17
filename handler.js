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

const emojiOptions = ["🥰", "👩‍⚕️", "😷"];
const emojiCount = Math.floor(Math.random() * 3);
const emojiIndex = Math.floor(Math.random() * emojiOptions.length);
const emoji = emojiOptions[emojiIndex].repeat(emojiCount);

const wfhOptions = [
  "Work from home today!",
  "WFH and chill?",
  "Stay safe! Work from home!",
  "Work from home! Wash your hands! Avoid touching your face!"
];
const wfhIndex = Math.floor(Math.random() * wfhOptions.length);
const wfh = wfhOptions[wfhIndex];

const text = `${wfh} ${emoji}`;

module.exports.b2w = async (event) => {
  await post(process.env.SLACK_PATH, {
    text
  });

  return {
    message: "B2W message posted successfully!",
    event
  };
};
