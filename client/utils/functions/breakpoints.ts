interface Breakpoints {
  iphoneSE: string;
  galaxyNote: string;
  iphoneX: string;
  pixel2: string;
  iPad: string;
  iPadPro: string;
  laptopSM: string;
  desktopSM: string;
  laptopMed: string;
  desktopMed: string;
  desktopLg: string;
  desktopXLg: string;
}

type MediaQuery = (device: string, bounds: string, mode?: string) => string;

const breakpoints: Breakpoints = {
  iphoneSE: "320",
  galaxyNote: "360",
  iphoneX: "375",
  pixel2: "414",
  iPad: "768",
  iPadPro: "1024",
  laptopSM: "1280",
  desktopSM: "1366",
  laptopMed: "1440",
  desktopMed: "1680",
  desktopLg: "1920",
  desktopXLg: "2560",
};

const mq: MediaQuery = (device, bounds, mode = "portrait") => {
  let bpArr = Object.keys(breakpoints).map((bp: string) => {
    //@ts-ignore
    return [bp, breakpoints[bp]];
  });

  const [result] = bpArr.reduce((acc, [name, size]) => {
    if (name === device) {
      return [...acc, `@media screen and (${bounds}-width: ${size}px)`];
    }
    return acc;
  }, []);

  return result;
};

export default mq;
