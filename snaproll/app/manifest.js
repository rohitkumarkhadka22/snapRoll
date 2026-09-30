export default function manifest() {
  return {
    name: "SnapRoll",
    short_name: "SnapRoll",
    description: "Shared digital disposable cameras for events.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/favicon.png", sizes: "256x256", type: "image/png" }],
  };
}
