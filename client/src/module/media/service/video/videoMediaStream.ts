const videoConstraints = {
  video: {
    width: { ideal: 1280, max: 1920 },
    height: { ideal: 720, max: 1080 },
    frameRate: { ideal: 30, max: 60 },
    aspectRatio: 16 / 9,
    facingMode: "user",
  },
};

export const getVideoMediaStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
    return stream;
  } catch (error) {
    console.error("Error accessing video stream:", error);
    throw error;
  }
};
