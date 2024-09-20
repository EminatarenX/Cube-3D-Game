self.onmessage = (e: MessageEvent) => {
  const { jumpTime, jumpDuration, jumpHeight } = e.data;

  const t = (jumpTime % jumpDuration) / jumpDuration;
  const y = Math.sin(t * Math.PI) * jumpHeight;
  const rotate = Math.PI * t;

  postMessage({ y, rotate });
};
