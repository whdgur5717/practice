import { type ThemeConfig } from "antd";

export const config: ThemeConfig = {
  token: {
    colorPrimary: "#4a7cfe",
    colorInfo: "#4a7cfe",
    colorBorder: "#e3e3e3",
    colorFillAlter: "rgba(0,0,0,0.02)",
    colorIcon: "rgba(0,0,0,0.45)",
    colorSplit: "rgba(0,0,0,0.06)",
  },
  components: {
    Button: {
      colorBgTextHover: "rgba(0,0,0,0.06)",
    },
    Modal: {
      padding: 16,
    },
  },
};
