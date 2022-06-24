import {
  Context,
  createMockContext,
  MockContext,
} from "../__mocks__/prismaContext";

let mockCtx: MockContext = createMockContext();
let ctx: Context = mockCtx;

// afterAll(() => {
//   ctx.prisma.$disconnect();
// });

// beforeEach(() => {});
