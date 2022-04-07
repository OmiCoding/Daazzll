import {
  MockContext,
  Context,
  createMockContext,
} from "../__mocks__/prismaContext";
import redisClient from "../cacheServer";
// @ts-ignore: Unreachable code error
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
  await prismaClient.user.deleteMany({});
  await prismaClient.$disconnect();
  await redisClient.disconnect();
});
