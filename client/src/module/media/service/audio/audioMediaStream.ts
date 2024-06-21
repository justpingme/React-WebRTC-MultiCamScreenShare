const audioConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
};

export const getAudioMediaStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(audioConstraints);
    return stream;
  } catch (error) {
    console.error("Error accessing audio stream:", error);
    throw error;
  }
};
