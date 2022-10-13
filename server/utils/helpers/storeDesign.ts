import { Request } from "express";
import prismaClient from "../../prismaClient";

async function storeDesign({}) {
  prismaClient.designs.create();
}

export default storeDesign;
