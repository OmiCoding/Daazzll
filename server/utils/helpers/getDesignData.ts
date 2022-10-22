import prismaClient from "../../prismaClient";
import { DesignData } from "../../custom-types";

async function getDesignData(id: number, cursorId?: number) {
  let data: DesignData[];
  let cursor: number | undefined;

  if (cursorId) {
    data = await prismaClient.designs.findMany({
      where: {
        userId: id, 
      },
      select: {
        id: true,
        url: true,
      },
      cursor: {
        id: cursorId
      }
    })
  } else {
    data = await prismaClient.designs.findMany({
      where: {
        userId: id, 
      },
      select: {
        id: true,
        url: true,
      },
      take: 5,
    })
  }

  if (data.length !== 0) {
    cursor = data[data.length - 1].id;
  } 

  return { data, cursor };
}



export default getDesignData;