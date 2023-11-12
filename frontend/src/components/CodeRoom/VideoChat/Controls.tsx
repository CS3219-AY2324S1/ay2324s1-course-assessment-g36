import { useState } from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";

interface IOwnProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

export const Controls = ({ tracks }: IOwnProps): JSX.Element => {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const toggle = async (type: "audio" | "video"): Promise<void> => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((prevState) => {
        return { ...prevState, audio: !prevState.audio };
      });
    }
    if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((prevState) => {
        return { ...prevState, video: !prevState.video };
      });
    }
  };

  return (
    <>
      <IconButton
        aria-label="Audio"
        color="white"
        icon={trackState.audio ? <FiMic /> : <FiMicOff />}
        onClick={(): Promise<void> => toggle("audio")}
        size="xs"
      />
      <IconButton
        aria-label="Video"
        color="white"
        icon={trackState.video ? <FiVideo /> : <FiVideoOff />}
        onClick={(): Promise<void> => toggle("video")}
        size="xs"
      />
    </>
  );
};
