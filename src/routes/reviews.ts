import app from "../server";
import verifyToken from "../validation/verify-token";
import verifyAdmin from "../validation/admin/verify-admin";
import addReview from "../controllers/reviews/add-review";
import displayReviews from "../controllers/reviews/display-reviews";
import deleteReview from "../controllers/reviews/delete-review";
import updateReview from "../controllers/reviews/update-review";
import { adminMiddleware, userMiddleware } from "../helper/middlewares/middlewares";

app.post("/reviews/:dishId", userMiddleware, addReview);
app.get("/reviews/:dishId", userMiddleware, displayReviews);
app.put("/admin/reviews/:reviewId", adminMiddleware, updateReview);
app.delete("/admin/reviews/:reviewId", adminMiddleware, deleteReview);
