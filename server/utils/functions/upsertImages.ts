import { Request } from "express";
import prismaClient from "../../prismaClient";

const upsertImages = async function (type: string, req: Request) {
  const { username, email, id } = req.user;
  const { image, ext, link } = req.body;

  if (type === "profile") {
    await prismaClient.acc_profiles.upsert({
      where: {
        userId: id,
      },
      update: {
        avatar: {
          upsert: {
            update: {
              image,
              ext,
              link,
            },
            create: {
              image,
              ext,
              link,
            },
          },
        },
      },
      create: {
        userId: id,
        user: id,
        avatar: {
          create: {
            image,
            ext,
            link,
          },
        },
      },
    });
    // await prismaClient.accounts.update({
    //   where: {
    //     email_username: {
    //       username: username,
    //       email: email,
    //     },
    //   },
    //   data: {
    //     profile: {
    //       upsert: {
    //         update: {
    //           avatar: {
    //             upsert: {
    //               update: {
    //                 image,
    //                 ext,
    //                 link,
    //               },
    //               create: {
    //                 image,
    //                 ext,
    //                 link,
    //               },
    //             },
    //           },
    //         },
    //         create: {
    //           avatar: {
    //             create: {
    //               image,
    //               ext,
    //               link,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  } else {
    await prismaClient.acc_profiles.upsert({
      where: {
        userId: id,
      },
      update: {
        banner: {
          upsert: {
            update: {
              image,
              ext,
              link,
            },
            create: {
              image,
              ext,
              link,
            },
          },
        },
      },
      create: {
        userId: id,
        user: id,
        banner: {
          create: {
            image,
            ext,
            link,
          },
        },
      },
    });
    // await prismaClient.accounts.update({
    //   where: {
    //     email_username: {
    //       username: username,
    //       email: email,
    //     },
    //   },
    //   data: {
    //     profile: {
    //       upsert: {
    //         update: {
    //           banner: {
    //             upsert: {
    //               update: {
    //                 image,
    //                 ext,
    //                 link,
    //               },
    //               create: {
    //                 image,
    //                 ext,
    //                 link,
    //               },
    //             },
    //           },
    //         },
    //         create: {
    //           banner: {
    //             create: {
    //               image,
    //               ext,
    //               link,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  }
};

export default upsertImages;
