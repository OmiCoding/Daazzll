import { RequestHandler, Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import { DesignData } from "../custom-types"
import busboy from "busboy";
import { setupAvatarUrl, setupBannerUrl, setUpDesignUrl, setupDesignUrls } from "../utils/cloudinary/cloudinaryHelpers";
import { 
  storeUploadData, 
  getProfileData,
  getDesignData, 
  getBannerData, 
  getAvatarData, 
  storeDesign,
  uploadProfPromise,
  uploadDesignPromise,
  storeLink,
  userData,
  linkData,
 } from "../utils/helpers/profileHelpers";


interface DesignDataRes {
  data: DesignData[]; 
  cursor: number | null; 
  version: number | undefined;
}

// export const profile: RequestHandler = async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { username } = req.params;

//     const data = await prismaClient.accounts.findFirst({
//       where: {
//         username: username,
//       },
//       select: {
//         username: true,
//         profile: {
//           select: {
//             website: true,
//             facebook: true,
//             discord: true,
//             instagram: true,
//             twitter: true,
//           },
//         },
//       },
//     });
//     return res.status(200).json({
//       ...data,
//       profile: {
//         ...data?.profile,
//       },
//     });
    
//   } catch (e: any) {
//     return next(e);
//   }
// };

export const profileData: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const { username, email } = req.user;

    if (!email || !username) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const result = await getProfileData(username, email);

    return res.status(200).json({
      username: result.username,
      avatarUrl: result.avatarUrl,
      bannerUrl: result.bannerUrl,
      social: result.social,
      user: true,
      msg: "Ok",
    });
  } catch (e) {
    return next(e);
  }
};

export const uploadProfileImgs: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, username, email } = req.user;
    const data = await uploadProfPromise(req);
    let imageUrl = "";

    await storeUploadData(userId, email, username, data);

    if(data.model === "avatar") {
      imageUrl = setupAvatarUrl(data.imageId, data.ext, data.version);
    } else {
      imageUrl = setupBannerUrl(data.imageId, data.ext, data.version);
    }

    return res.status(200).json({
      imageUrl,
      msg: "Ok",
    })
  } catch (err) {
    next(err);
  }
};

export const getAvatarImg: RequestHandler = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const dbData = await getAvatarData(req.user.userId);
    let avatarData;
    if (dbData) {
       avatarData = setupAvatarUrl(dbData.imageId, dbData.ext, dbData.version);
    }
    return res.status(200).json({
      url: avatarData,
      msg: "Ok"
    });
  } catch(e) {
    return next(e);
  }
}

export const getBannerImg: RequestHandler = async function(req:Request, res: Response, next: NextFunction) {
  try {
    const dbData = await getBannerData(req.user.userId);
    let bannerData;
    if(dbData) {
      bannerData = setupBannerUrl(dbData.imageId, dbData.ext, dbData.version);
    }
    return res.status(200).json({
      url: bannerData,
      msg: "Ok"
    });
  } catch(e) {
    return next(e);
  }
}

export const getDesigns: RequestHandler = async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  if (!req.params) {
    throw new Error("Invalid parameters");
  }
  let dbData: DesignDataRes;
  const { cursor } = req.params;

  const parsedCursor = parseInt(cursor);

  if (parsedCursor === 0) {
    dbData = await getDesignData(req.user.userId);
  } else {
    dbData = await getDesignData(req.user.userId, parsedCursor); 
  }

  const idArr: string[] = [];
  
  for (let i=0; i < dbData.data.length; i++) {
    idArr.push(dbData.data[i].imageId);
  }

  const imgs = setupDesignUrls(idArr, dbData.version);

  return res.status(200).json({
   imgs: imgs,
   cursor: dbData.cursor,
   msg: "Ok"
  })
  } catch(e) {
    return next(e);
  }
};

export const postDesigns: RequestHandler = async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await uploadDesignPromise(req);
    
    await storeDesign(req.user.userId, data);

    const designUrl = setUpDesignUrl(data.imageId, data.version);
    return res.status(200).json({
      designUrl,
      msg: "Ok",
    })
  } catch (err) {
    next(err);
  }
};

export const createLink: RequestHandler = async function (req, res, next) {
  try {
    const { option, url } = req.body;

    const link = await storeLink(req.user.userId, option, url);
    console.log(link);

    return res.status(200).json({
      link,
      msg: "Ok",
    });
  } catch (e: any) {
    return next(e);
  }
};

export const getLink: RequestHandler = async function(req, res, next) {
  try {
    const { option } = req.body;  
    
    const link = await linkData(req.user.userId, option);

    return res.status(200).json({
      link,
      msg: "Ok"
    })
  } catch(e) {
    return next(e);
  }
}

export const getUser: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.params;

    const user = await userData(username);

    return res.status(200).json({
      user,
      msg: "Ok",
    })
  } catch(e) {
    return next(e);
  }
}