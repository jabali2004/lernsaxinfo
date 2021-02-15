type IRawCheck = {
  checkId: string;
  isOffline: boolean;
  loginEnabled: boolean;
  response?: object; // JSON object from puppeteer
  metrics_start?: object; // JSON object from puppeteer
  metrics_end?: object; // JSON object from puppeteer
  performance?: object;
  checked: string;
};

export default IRawCheck;
