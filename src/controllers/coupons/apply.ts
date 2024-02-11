import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request";
import { collection } from "../../database/connection";
import { pipeline } from "stream";
import { ObjectId } from "mongodb";
//not finished
export default async function apply(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  //const couponId = requestHandler.input("couponId");
  const cartCollection = collection("cart");
  const couponsCollection = collection("coupons");
  const date = new Date(Date.now());
  const userId = (request as any).user._id;
  const users = collection("users");
  let coupon;
  let discountPercentage;
  try {
    const user = await users.findOne({ _id: new ObjectId(userId) });
    coupon = await couponsCollection.findOne({ _id: new ObjectId(user?.code) });
    if (coupon?.start > date && coupon?.end < date) {
      return reply.send({ msg: "expired coupon" });
    }
    if (coupon?.type == "percentage") {
      discountPercentage = coupon.value;

      const result = await cartCollection.aggregate([
        {
          $match: { userId: userId },
        },
        {
          $group: {
            _id: "$userId",
            totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
          },
        },
        {
          $addFields: {
            totalPrice: "$totalPrice",
          },
        },
        {
          $addFields: {
            discountAmount: {
              $multiply: [
                "$totalPrice",
                { $divide: [100, discountPercentage] },
              ],
            },
          },
        },
        {
          $addFields: {
            discountPrice: { $subtract: ["$totalPrice", "$discountAmount"] },
          },
        },
        {
          $project: {
            totalPrice: 1,
            discountPrice: 1,
          },
        },
      ]);
      reply.send(result);
    } else if (coupon?.type == "number") {
      const result = await cartCollection.aggregate([
        {
          $match: { userId: userId },
        },
        {
          $group: {
            _id: "$userId",
            totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
          },
        },
        {
          $addFields: {
            totalPrice: "$totalPrice",
          },
        },
        {
          $addFields: {
            discountPrice: { $subtract: ["$totalPrice", coupon?.value] },
          },
        },
        {
          $project: {
            totalPrice: 1,
            discountPrice: 1,
          },
        },
      ]);
      reply.send(result);
    }
  } catch (err) {
    reply.status(404).send({ msg: "error applying coupon" });
  }
}
