const ratingProduct = (rating => {
  rating = Number.parseFloat((Math.random() * 5).toFixed(1));
  return rating;
})