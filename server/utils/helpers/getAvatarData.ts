import prismaClient from "../../prismaClient";

async function getAvatarData(userId: number) {
  const data = await prismaClient.acc_avatars.findUnique({
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


export default getAvatarData;