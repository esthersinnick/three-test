const deleteSpace = self => {
  window.removeEventListener("resize", self.handleWindowResize);
  window.cancelAnimationFrame(self.requestID);
  self.controls.dispose();
};
