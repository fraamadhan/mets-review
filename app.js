const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadReview, loadProfile } = require("./utils/review");
const { getBestOfTheWeekReview, getReviewById } = require("./utils/utils");
const updateLike = require("./utils/update-like");
const app = express();
const port = 3000;

app.use(express.json());
//set the view engine using ejs
app.set("view engine", "ejs");
//Built-in middleware
app.use(express.static("public"));
//Third party middleware
app.use(expressLayouts);

app.get("/", (req, res) => {
  const reviews = loadReview();
  const bestOfTheWeekReview = getBestOfTheWeekReview(reviews);
  const name = "Ansellma";
  const email = "ansellmacantik@gmail.com";
  res.render("index", { layout: "partials/main-layout", name, email, reviews: bestOfTheWeekReview, title: "Home Page" });
});
app.get("/review", (req, res) => {
  res.render("review", { layout: "partials/main-layout", title: "Review Page" });
});
app.get("/review/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;
  const reviews = loadReview();
  const review = getReviewById(reviews, reviewId);
  if (review.status !== 200) {
    return next();
  }
  console.log(review.data.id);

  res.render("reviewId/review-detail", { layout: "partials/main-layout", review, title: `${review.data.title}` });
});
app.get("/profile", (req, res) => {
  res.render("profile", { layout: "partials/main-layout", title: "Profile Page" });
});

app.post("/review", (req, res) => {});

app.put("/update-like", async (req, res) => {
  const { likesCount, reviewID, isLiked } = req.body;

  if (isNaN(likesCount)) {
    return res.status(400).json({ status: 200, message: "Like must be a number" });
  }

  try {
    const result = await updateLike(likesCount, reviewID, isLiked);
    console.log(result);

    res.status(result.status).json({ status: 200, message: result.message, data: result.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 200, message: "Internal server error", data: error });
  }
});

app.use((req, res) => {
  res.status(404).render("not-found", { layout: "partials/main-layout", title: "Not Found", data: { status: 404, message: "Page not found" } });
});

app.use((req, res) => {
  res.status(500).render("something-wrong", { layout: "partials/main-layout", title: "Something wrong", data: { status: 500, message: "Something wrong!" } });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
