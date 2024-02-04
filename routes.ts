import app from "./src/server";
import signup from "./src/controllers/users/signup";
import displayUsers from "./src/controllers/users/display-users";
import displayUser from "./src/controllers/users/display-user";
import updateUser from "./src/controllers/users/update-user";
import deleteUser from "./src/controllers/users/delete-user";
import login from "./src/controllers/users/login";
import forget from "./src/controllers/users/forget";
import reset from "./src/controllers/users/reset";
import verifyEmail from "./src/controllers/users/verify-email";
import verifyToken from "./src/validation/verify-token";
import addCategory from "./src/controllers/categories/add-category";
import listCategories from "./src/controllers/categories/list-categories";
import updateCategory from "./src/controllers/categories/update-category";
import deleteCategory from "./src/controllers/categories/delete-category";
import dishesByCategories from "./src/controllers/categories/dishes-by-category";
import addDish from "./src/controllers/dishes/add-dish";
import deleteDish from "./src/controllers/dishes/delete-dish";
import updateDish from "./src/controllers/dishes/update-dish";
import listDishes from "./src/controllers/dishes/list-dishes";
import showDish from "./src/controllers/dishes/show-dish";
import listBlogs from "./src/controllers/blogs/list-blogs";
import addBlog from "./src/controllers/blogs/add-blog";
import displayBlog from "./src/controllers/blogs/display-blog";
import deleteBlog from "./src/controllers/blogs/delete-blog";
import updateBlog from "./src/controllers/blogs/update-blog";
import addReview from "./src/controllers/reviews/add-review";
import displayReviews from "./src/controllers/reviews/display-reviews";
import deleteReview from "./src/controllers/reviews/delete-review";
import updateReview from "./src/controllers/reviews/update-review";
//Users Login,Registration,Forget,Reset.
app.get("/users", { preHandler: verifyToken }, displayUsers);
app.get("/users/:id", displayUser);
app.post("/signup", signup);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.post("/login", login);
app.post("/forget", forget);
app.post("/reset", reset);
app.post("/verify/email", verifyEmail);
//Restaurant categories
app.post("/categories", addCategory);
app.get("/categories/:categoryId", dishesByCategories);
app.get("/categories", listCategories);
app.put("/categories/:categoryId", updateCategory);
app.delete("/categories/:categoryId", deleteCategory);
//Restaurant dishes
app.post("/dishes", addDish);
app.get("/dishes", listDishes);
app.get("/dishes/:dishId", showDish);
app.put("/dishes/:dishId", updateDish);
app.delete("/dishes/:dishId", deleteDish);
//Restaurant blogs
app.get("/blogs", listBlogs);
app.get("/blogs/:id", displayBlog);
app.post("/blogs", addBlog);
app.put("/blogs/:id", updateBlog);
app.delete("/blogs/:id", deleteBlog);
//Restaurant cart
/*app.get("/carts/items", displayItems);
app.delete("/carts/:itemId", deleteItem);
app.put("/carts/:itemId", updateItem);
app.post("/carts/add/:itemId", addItem);
app.get("/pay", payment);*/
//Dishes reviews
app.post("/reviews/:dishId", addReview);
app.get("/reviews/:dishId", displayReviews);
app.put("/reviews/:reviewId", updateReview);
app.delete("/reviews/:reviewId", deleteReview);
//Restaurant admin
/*app.get("/admins", displayAdmins);
app.get("/admins/:id", displayAdmin);
app.post("/admins", addAdmin);
app.put("/admins", updateAdmin);
app.delete("/admins", deleteAdmin);*/
//Additional services
/*app.post("/messages", sendMessage);
app.post("/subscribe", subscribe);
app.get("/questions", questions);
*/
