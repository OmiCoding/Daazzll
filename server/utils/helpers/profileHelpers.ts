import prismaClient from "../../prismaClient";

interface uploadContext {
  model: any;
  imageId: string;
  ext: string;
  url: string;
  type: string;
  folder: string;
}

export const storeUploadData = async function (
  req: Request,
  { model, imageId, ext, type, url, folder }: uploadContext
) {
  try {
    await prismaClient.acc_profiles.upsert({
      where: {
        userId: req.user.userId,
      },
      update: {
        [model]: {
          upsert: {
            update: {
              imageId,
              ext,
              type,
              url,
              folder,
            },
            create: {
              imageId,
              ext,
              type,
              url,
              folder,
            },
          },
        },
      },
      create: {
        user: {
          connect: {
            email_username: {
              email: req.user.email,
              username: req.user.username,
            },
          },
        },
        [model]: {
          create: {
            imageId,
            ext,
            type,
            url,
            folder,
          },
        },
      },
    });
  } catch (err) {
    throw new Error("Something has gone wrong...");
  }
};
