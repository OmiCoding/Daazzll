// import { Request } from "express";
// import prismaClient from "../../prismaClient";

// const upsertImages = async function (uploadType: string, req: Request) {
//   const { userId, username, email } = req.user;
//   const { image, ext, type } = req.body;

//   if (uploadType === "profile") {
//     await prismaClient.acc_profiles.upsert({
//       where: {
//         userId: userId,
//       },
//       update: {
//         avatar: {
//           upsert: {
//             update: {
//               image,
//               ext,
//             },
//             create: {
//               image,
//               ext,
//               type,
//             },
//           },
//         },
//       },
//       create: {
//         user: {
//           connect: {
//             email_username: {
//               email: email,
//               username: username,
//             },
//           },
//         },
//         avatar: {
//           create: {
//             image,
//             ext,
//             type,
//           },
//         },
//       },
//     });
//   } else {
//     await prismaClient.acc_profiles.upsert({
//       where: {
//         userId: userId,
//       },
//       update: {
//         banner: {
//           upsert: {
//             update: {
//               image,
//               ext,
//             },
//             create: {
//               image,
//               ext,
//               type,
//             },
//           },
//         },
//       },
//       create: {
//         user: {
//           connect: {
//             email_username: {
//               email: email,
//               username: username,
//             },
//           },
//         },
//         banner: {
//           create: {
//             image,
//             ext,
//             type,
//           },
//         },
//       },
//     });
//   }
// };

// export default upsertImages;
