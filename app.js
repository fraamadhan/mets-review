const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadReview, loadProfile } = require("./utils/review");
const { getBestOfTheWeekReview, getReviewById } = require("./utils/utils");
const app = express();
const port = 3000;

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

  res.render("reviewId/review-detail", { layout: "partials/main-layout", review, title: `${review.data.title}` });
});
app.get("/profile", (req, res) => {
  res.render("profile", { layout: "partials/main-layout", title: "Profile Page" });
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
