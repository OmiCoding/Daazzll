import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import busboy from "busboy";
import { DesignData } from "../../custom-types";
import prismaClient from "../../prismaClient";
import { setupAvatarUrl, setupBannerUrl } from "../cloudinary/cloudinaryHelpers";

interface CommonContext {
  imageId: string;
  ext: string;
  url: string;
  type: string;
  folder: string;
}

interface ProfileContext extends CommonContext {
  model: any;
  version: number;
}

interface DesignContext extends CommonContext {
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
              imageId: true,
              ext: true,
              version: true,
            }
          },
          banner: {
            select: {
              url: true,
              imageId: true,
              ext: true,
              version: true,
            }
          },
          social: {
            select: {
              website: true,
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
        const avatar = profile.avatar;
        avatarUrl = setupAvatarUrl(avatar.imageId, avatar.ext, avatar.version);
      }
      if(profile.banner) {
        const banner = profile.banner;
        bannerUrl = setupBannerUrl(banner.imageId, banner.ext, banner.version);
      }
      if(profile.social) {
        socialData = {...profile.social};
      }
    }
  }
  

  return {
    username: data?.username,
    avatarUrl,
    bannerUrl,
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

export const storeUploadData = async function (userId: number, email: string, username: string, { model, imageId, ext, type, url, folder, version }: ProfileContext) {
  try {
    await prismaClient.acc_profiles.upsert({
      where: {
        userId: userId,
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
              version,    
            },
            create: {           
              imageId,
              ext,
              type,
              url,
              folder,
              version
            },
          },
        },
      },
      create: {
        user: {
          connect: {
            email_username: {
              email: email,
              username: username,
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
            version,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
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
  userId: number,
  { imageId, ext, type, url, folder, version }: DesignContext
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
        userId: userId,
      },
    });
  } catch (e: any) {
    console.error(e);
  }
};

export const uploadProfPromise = async function(req: Request) {
  return new Promise<ProfileContext>((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    let folder = "";
    let model = "";

    if (req.query.uploadType === "banners") {
      folder = req.query.uploadType;
      model = "banner";
    } else if (req.query.uploadType === "avatars") {
      folder = req.query.uploadType;
      model = "avatar";
    } else {
      throw new Error("A folder must be specified.");
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
      },
      function (err, result) {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (result) {
          resolve ({
            model: model,
            imageId: result.public_id,
            ext: result.format,
            type: result.resource_type,
            url: result.secure_url,
            folder: result.folder,
            version: result.version,
          });
        }
      }
    )

    bb.on("file", (name, file, info) => {
      file.pipe(uploadStream);
    });
    req.pipe(bb);
  });
}

export const uploadDesignPromise = async function(req: Request) {
  return new Promise<DesignContext>((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "designs",
      },
      function (err, result) {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (result) {
          resolve({
            imageId: result.public_id,
            ext: result.format,
            type: result.resource_type,
            url: result.secure_url,
            folder: result.folder,
            version: result.version,
          });
        }
      }
    );

    bb.on("file", (name, file, info) => {
      file.pipe(uploadStream);
    });
    req.pipe(bb);
  })
}

export const storeLink = async function(userId: number, option: string, url: string) {
  const data = await prismaClient.acc_socials.upsert({
    where: {
      profileId: userId,
    },
    update: {
      [option]: url,
    },
    create: {
      [option]: url,
      profileId: userId
    },
    select: {
      [option]: true,
    }
  })

  return data;
}

export const userData = async function(user: string) {
  const data = await prismaClient.accounts.findFirst({
    where: {
      username: user,
    },
    select: {
      username: true,
      profile: {
        select: {
          pitch: true,
          social: {
            select: {
              website: true,
              discord: true,
              facebook: true,
              instagram: true,
              twitter: true,
            }
          },
          avatar: {
            select: {
              imageId: true,
              ext: true,
              version: true,
            }
          },
          banner: {
            select: {
              imageId: true,
              ext: true,
              version: true,
            }
          }
        }
      }
    }
  });

  let username = "";
  let avatarUrl = "";
  let bannerUrl = "";
  let pitch = "";
  let social;

  if(data) {
    username = data.username;
    if(data.profile) {
      const profile = data.profile;
      if(profile.pitch) {
        pitch = profile.pitch;
      }
      if(profile.avatar) {
        const avatar = profile.avatar;
        avatarUrl = setupAvatarUrl(avatar.imageId, avatar.ext, avatar.version);
      }
      if(profile.banner) {
        const banner = profile.banner;
        bannerUrl = setupBannerUrl(banner.imageId, banner.ext, banner.version);
      }
      if(profile.social) {
        social = profile.social;
      }
    }
  }

  return {
    username,
    pitch,
    avatar: avatarUrl,
    banner: bannerUrl,
    social,
  }
}