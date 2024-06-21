import React, { useEffect, useRef } from "react";
import { MediaAudioStreamType } from "../../../members/types";


interface AudioElementProps {
  audioStream: MediaAudioStreamType;
}

const AudioElement: React.FC<AudioElementProps> = ({ audioStream }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = audioStream.stream;
    }
  }, [audioStream]);

  return <audio ref={audioRef} autoPlay />;
};

interface AudioPlayersProps {
  audioStreams: MediaAudioStreamType[];
}

const AudioPlayers: React.FC<AudioPlayersProps> = ({ audioStreams }) => {
  return (
    <>
      {audioStreams.map((audioStream) => (
        <AudioElement key={audioStream.memberId} audioStream={audioStream} />
      ))}
    </>
  );
};

export default AudioPlayers;
