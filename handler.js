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

const emojiOptions = ["😡", "😠", "😾", "🤬", "👿", "😘", "🥰"];
const w = "W".repeat(Math.floor(Math.random() * 4) + 1);
const emojiCount = Math.floor(Math.random() * 3);
const emojiIndex = Math.floor(Math.random() * emojiOptions.length);
const emoji = emojiOptions[emojiIndex].repeat(emojiCount);
const exclamationMark = "!".repeat(Math.floor(Math.random() * 4));
const text = `B2${w}${exclamationMark} ${emoji}`;

console.log(text);

module.exports.b2w = async (event) => {
  await post(process.env.SLACK_PATH, {
    text
  });

  return {
    message: "B2W message posted successfully!",
    event
  };
};
