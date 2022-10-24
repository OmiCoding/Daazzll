import { Request } from "express";
import prismaClient from "../../prismaClient";

interface uploadContext {
  imageId: string;
  ext: string;
  url: string;
  type: string;
  folder: string;
  version: number;
}

async function storeDesign(
  req: Request,
  { imageId, ext, type, url, folder, version }: uploadContext
) {
  try {
    await prismaClient.designs.create({
      data: {
        imageId,
        ext,
        type,
        url,
        folder,
        version,
        userId: req.user.userId,
      },
    });
  } catch (e: any) {
    console.error(e);
  }
}

export default storeDesign;
