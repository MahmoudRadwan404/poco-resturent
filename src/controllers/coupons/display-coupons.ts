import { FastifyReply, FastifyRequest } from "fastify";
import { collection } from "../../database/connection";
import listWithPagination from "../../helper/rud/list";
import handle from "../../core/request";

export default async function displayCoupons(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandler = handle(request);
  const couponsCollection = collection("coupons");
  const page = +requestHandler.input("page") || 1;
  const coupons = await listWithPagination(couponsCollection, page,[]);
  if (coupons) {
    reply.status(200).send(coupons);
  } else {
    reply.status(404).send({ msg: "error displaying coupons" });
  }
}
