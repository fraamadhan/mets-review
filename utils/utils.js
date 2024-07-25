const getBestOfTheWeekReview = (reviews) => {
  const temp = reviews.filter((review) => review.likes >= 500);

  return temp;
};

const getReviewById = (reviews, reviewID) => {
  const review = reviews.find((review) => review.id === parseInt(reviewID));
  if (!review) {
    return { status: 404, message: "Review is not found", data: null };
  }

  return { status: 200, message: "Review is found successfully", data: review };
};

module.exports = { getBestOfTheWeekReview, getReviewById };
