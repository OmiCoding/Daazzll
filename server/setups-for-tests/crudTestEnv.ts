import {
  MockContext,
  Context,
  createMockContext,
} from "../__mocks__/prismaContext";
import { redisClient } from "../storageInit";
import prismaClient from "../prismaClient";

let mockCtx: MockContext = createMockContext();
let ctx: Context = mockCtx;

beforeAll(async () => {
  await redisClient.connect();
  // await ctx.prisma.$connect();
  await prismaClient.$connect();
});

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx;
});

afterAll(async () => {
  await prismaClient.accounts.deleteMany({});
  await prismaClient.$disconnect();
  await redisClient.disconnect();
});
