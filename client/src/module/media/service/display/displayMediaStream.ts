const constraints = {
  video: {
    width: { ideal: 1920, max: 3840 },
    height: { ideal: 1080, max: 2160 },
    frameRate: { ideal: 60, max: 120 },
    cursor: "always"
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
};

export const getDisplayMediaStream = async () => {
  try {
    return await navigator.mediaDevices.getDisplayMedia(constraints);
  } catch (error) {
    console.error("Error: ", error);
    return undefined;
  }
};
