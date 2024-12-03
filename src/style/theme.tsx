import { ConfigProvider } from "antd";
import { config } from "./config";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider theme={{ ...config }}>{children}</ConfigProvider>;
};
