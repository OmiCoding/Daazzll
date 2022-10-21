import { Request } from "express";
import prismaClient from "../../prismaClient";

interface uploadContext {
  imageId: string;
  ext: string;
  url: string;
  type: string;
  folder: string;
}

async function storeDesign(
  req: Request,
  { imageId, ext, type, url, folder }: uploadContext
) {
  try {
    // console.log(req.user);
    // await prismaClient.accounts.findUnique({
    //   where: {
    //     email_username: {
    //       email: req.user.email,
    //       username: req.user.username,
    //     }
    //   },
    //   select: {
    //     designs: {
          
    //     }
    //   }
    // });


    await prismaClient.designs.create({
      data: {
        imageId,
        ext,
        type,
        url,
        folder,
        userId: req.user.userId,
      },
    });
  } catch (e: any) {
    console.error(e);
  }
}

export default storeDesign;
