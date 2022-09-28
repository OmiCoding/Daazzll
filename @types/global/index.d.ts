export {};

declare global {
  interface Window {
    app?: {
      url: string;
      auth?: {
        auth: true;
        username: string;
      };
    };
  }
}
