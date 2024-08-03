const fs = require("fs");

const updateLike = (likeCount, reviewID, isLiked) => {
  try {
    const result = updateFile(likeCount, reviewID, isLiked);
    return result;
  } catch (error) {
    return { status: 500, message: "Internal server error", data: error };
  }
};

const writeFile = (newReviews) => {
  //write file
  fs.writeFileSync("data/reviews.json", JSON.stringify(newReviews));

  return { status: 200, message: "Data stored successfully" };
};

const updateFile = (likeCount, reviewID, isLiked) => {
  try {
    const data = fs.readFileSync("./data/reviews.json");

    const reviews = JSON.parse(data);

    if (isNaN(likeCount)) {
      return { status: 400, message: "Like must a number" };
    }

    const newReviews = reviews.map((review) => {
      if (review.id === parseInt(reviewID)) {
        review.likes = likeCount;
        review.isLiked = isLiked;

        console.log("is like?", isLiked);
      }

      return review;
    });

    const result = writeFile(newReviews);

    if (result.status !== 200) {
      return { status: 400, message: result.message };
    }

    return { status: 200, message: "Like updated", data: likeCount };
  } catch (err) {
    console.log("error when read file", err);
    return { status: 400, message: "Something went wrong when reading file" };
  }
};

module.exports = updateLike;
