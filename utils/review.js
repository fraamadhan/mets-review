const fs = require("fs");

const dirPath = "./data";
const dataPath = dirPath + "/reviews.json";
const profileDataPath = dirPath + "/profile.json";

//If data directory is not exist
if (!fs.existsSync(dirPath)) {
  try {
    fs.mkdir("data/", (err) => {
      if (err) throw err;
    });
    console.log("Directory created successfully");
  } catch (err) {
    console.log("Error message: ", err);
  }
}

//if data reviews json is not exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync("data/reviews.json", "[]");
  fs.writeFileSync("data/profile.json", "[]");
  console.log("File JSON created successfully");
}

//if data profile json is not exists
if (!fs.existsSync(profileDataPath)) {
  fs.writeFileSync("data/profile.json", "[]");
  console.log("File JSON created successfully");
}

const loadReview = () => {
  const file = fs.readFileSync("data/reviews.json", "utf-8");
  const reviews = JSON.parse(file);

  return reviews;
};

const loadProfile = () => {
  const file = fs.readFileSync("data/profile.json", "utf-8");
  const profile = JSON.parse(file);

  return profile;
};

module.exports = { loadReview, loadProfile };
