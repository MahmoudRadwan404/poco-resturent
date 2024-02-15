export default async function listWithPagination(
  collection: any,
  page: number,
  filter: any
) {
  const skip = (page - 1) * 15;
  const limit = 15;
  try {
    const result = await collection
      .find({ ...filter })
      .limit(limit)
      .skip(skip)
      .toArray();
    const pagination = {
      pages: Math.ceil(result.length / limit),
      page: page,
      categories: result.length,
    };
    return { pagination, result };
  } catch (err) {
    return false;
  }
}