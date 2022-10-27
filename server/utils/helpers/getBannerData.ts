import prismaClient from "../../prismaClient";

async function getBannerData(userId: number) {
  const data = await prismaClient.acc_banners.findUnique({
    where: {
      profileId: userId,
    },
    select: {
      imageId: true,
      version: true,
      ext: true,
    }
  });

  return data;
}

export default getBannerData;