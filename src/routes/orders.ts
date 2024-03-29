import app from "../server";
import acceptOrder from "../controllers/orders/accept-order";
import rejectOrder from "../controllers/orders/reject-order";
import acceptSpoiledFood from "../controllers/orders/accept-spoiled-food";
import rejectSpoiledFood from "../controllers/orders/reject-spoiled-food";
import listOrders from "../controllers/orders/list-orders";
import { adminMiddleware } from "../helper/middlewares/middlewares";
import { adminPrefix } from "../helper/prefix";
import orderByAdmin from "../controllers/orders/order-by-admin";

app.register((app, ops, next) => {
  app.get("/orders", listOrders);
  app.patch("/orders/reject/:orderId", adminMiddleware, rejectOrder);
  app.patch("/orders/accept/:orderId", adminMiddleware, acceptOrder);
  app.patch("/reject/:spoiledId", adminMiddleware, rejectSpoiledFood);
  app.patch("/accept/:spoiledId", adminMiddleware, acceptSpoiledFood);
  app.post("/order",adminMiddleware, orderByAdmin);
  next();
}, adminPrefix);
