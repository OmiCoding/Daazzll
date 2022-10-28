import { Request } from "express";
import { DesignData } from "../../custom-types";
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


export const getDesignData = async function(id: number, cursorId?: number) {
  let data: DesignData[];
  let cursor: number | null;
  let version: number | undefined;

  if (cursorId) {
    data = await prismaClient.designs.findMany({
      where: {
        userId: id, 
      },
      select: {
        id: true,
        imageId: true,
        version: true,
      },
      cursor: {
        id: cursorId
      },
      take: 5,
      skip: 1,
    })
  } else {
    data = await prismaClient.designs.findMany({
      where: {
        userId: id, 
      },
      select: {
        id: true,
        imageId: true,
        version: true,
      },
      take: 5,
    })
  }


  if (data.length !== 0) {
    cursor = data[data.length - 1].id;
    version = data[0].version;
  } else {
    cursor = null;
  } 

  return { data, cursor, version };
}