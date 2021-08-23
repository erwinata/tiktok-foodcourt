export const isPWA = () => {
  return true;

  const isStandalone = ["fullscreen", "standalone", "minimal-ui"].some(
    (displayMode) =>
      window.matchMedia("(display-mode: " + displayMode + ")").matches
  );
  if (document.referrer.startsWith("android-app://")) {
    return true;
  } else if ("standalone" in window.navigator || isStandalone) {
    return true;
  }
  return false;
};
