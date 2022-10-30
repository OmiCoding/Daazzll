import { Request } from "express";
import { DesignData } from "../../custom-types";
import prismaClient from "../../prismaClient";

interface CommonContext {
  imageId: string;
  ext: string;
  url: string;
  type: string;
  folder: string;
}

interface profileContext extends CommonContext {
  model: any;
}

interface designContext extends CommonContext {
  version: number;
}

 interface SocialContext {
  website?: string | null;
  discord?: string | null;
  twitter?: string | null;
  instagram?: string | null;
 }

export const getProfileData = async function(username: string, email: string) {
  const data = await prismaClient.accounts.findUnique({
    where: {
      email_username: {
        email: email,
        username: username,
      },
    },
    select: {
      username: true,
      profile: {
        select: {
          avatar: {
            select: {
              url: true,
            }
          },
          banner: {
            select: {
              url: true,
            }
          },
          social: {
            select: {
              webstite: true,
              discord: true,
              instagram: true,
              twitter: true,
            }
          }
        }
      },
    },
  });

  let avatarUrl = "";
  let bannerUrl = "";
  let socialData: SocialContext = {};

  if(data) {
    if(data.profile) {
      const profile = data.profile;
      if(profile.avatar) {
        avatarUrl = profile.avatar.url;
      }
      if(profile.banner) {
        bannerUrl = profile.banner.url;
      }
      if(profile.social) {
        socialData = {...profile.social};
      }
    }
  }
  

  return {
    username: data?.username,
    avatar: avatarUrl,
    banner: bannerUrl,
    social: {...socialData}
  };
}

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

export const getBannerData = async function(userId: number) {
  const data = await prismaClient.acc_banners.findUnique({
    where: {
      profileId: userId,
    },
    select: {
      imageId: true,
      version: true,
      ext: true,
    }
  });

  return data;
}

export const getAvatarData = async function(userId: number) {
  const data = await prismaClient.acc_avatars.findUnique({
    where: {
      profileId: userId,
    },
    select: {
      imageId: true,
      version: true,
      ext: true,
    }
  });

  return data;

}

export const storeUploadData = async function (
  req: Request,
  { model, imageId, ext, type, url, folder }: profileContext
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

export const storeLinkData = async function(id: number, url: string, option: string) {
  const data = await prismaClient.acc_socials.create({
    data: {
      [option]: url,
      profileId: id,
    },
    select: {
      [option]: true,
    }
  });

  return data;
};

export const storeDesign = async function(
  req: Request,
  { imageId, ext, type, url, folder, version }: designContext
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
};

