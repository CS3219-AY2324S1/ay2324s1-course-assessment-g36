import { useState } from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { HStack, IconButton } from "@chakra-ui/react";
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
    <HStack
      bottom={0}
      justifyContent="space-between"
      minH={7}
      position="absolute"
      px={2}
      py={0.5}
    >
      <IconButton
        aria-label="Audio"
        color="black"
        icon={trackState.audio ? <FiMic /> : <FiMicOff />}
        onClick={(): Promise<void> => toggle("audio")}
        size="xs"
      />
      <IconButton
        aria-label="Video"
        color="black"
        icon={trackState.video ? <FiVideo /> : <FiVideoOff />}
        onClick={(): Promise<void> => toggle("video")}
        size="xs"
      />
    </HStack>
  );
};
