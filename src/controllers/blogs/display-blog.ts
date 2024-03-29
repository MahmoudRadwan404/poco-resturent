import { FastifyReply, FastifyRequest } from "fastify";
import handle from "../../core/request";
import { collection } from "../../database/connection";
import { ObjectId } from "mongodb";

export default async function displayBlog(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestHandeler = handle(request);
  const blogId = requestHandeler.input("blogId");
  const blogsCollection = collection("blogs");
  const blog = await blogsCollection.findOne({ _id: new ObjectId(blogId) });
  reply.send(blog);
}
