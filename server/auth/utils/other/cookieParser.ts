// const cookieObj: any = req.headers.cookie.split(";").reduce(
//   (prev, curr) => {
//     const data = curr.trim().split("=");

//     if (data.length === 1) {
//       return {
//         ...prev,
//         [data[0]]: "",
//         keys: {
//           ...prev.keys,
//           [data[0]]: data[0],
//         },
//       };
//     } else {
//       return {
//         ...prev,
//         [data[0]]: data[1],
//         keys: {
//           ...prev.keys,
//           [data[0]]: data[0],
//         },
//       };
//     }
//   },
//   { keys: {} }
// );
