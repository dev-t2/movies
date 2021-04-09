import * as WebBrowser from 'expo-web-browser';

export const openBrowser = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};
