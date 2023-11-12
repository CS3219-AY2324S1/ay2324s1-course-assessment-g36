import { PropsWithChildren, useEffect, useState } from "react";
import { AgoraVideoPlayer, IAgoraRTCRemoteUser } from "agora-rtc-react";
import { useMicrophoneAndCameraTracks, useClient } from "./AgoraUtils";
import { Controls } from "./Controls";
import { Box } from "@chakra-ui/react";
import styles from "./VideoChat.module.css";

// TODO: dynamically set channel and token based on room number
const AGORA_APP_ID = "07a3b6e024c94596ae016c0bb2646e38";
const AGORA_TOKEN =
  "007eJxTYCjo2/EwUL3wRnFZkJnllvnTOI8b2afZ6285diSJMa5oKYcCg4F5onGSWaqBkUmypYmppVliqoGhWbJBUpKRmYlZqrHFnw+BqQ2BjAyTbdcwMjJAIIjPyVCQmlqkW1CUWsDAAACBWSAX";
const AGORA_CHANNEL = "peer-prep";

const VideoChat = (): JSX.Element => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async (): Promise<void> => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          user.audioTrack?.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(AGORA_APP_ID, AGORA_CHANNEL, AGORA_TOKEN, null);
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      setStart(true);
    };

    if (ready && tracks) {
      init();
    }
  }, [ready, tracks, client]);

  useEffect(() => {
    return () => {
      tracks?.forEach((track) => track.close());
    };
  }, [tracks]);

  return (
    <Box height={"25vh"} width={"25vw"}>
      {start && tracks && (
        <>
          <AgoraVideoPlayer
            className={styles.agora_video}
            videoTrack={tracks[1]}
            config={{ fit: "contain" }}
          />
          <Controls tracks={tracks} />
          {users.length > 0 && users[0].videoTrack && (
            <AgoraVideoPlayer
              className={styles.agora_video}
              videoTrack={users[0].videoTrack}
              config={{ fit: "contain" }}
            />
          )}
        </>
      )}
    </Box>
  );
};
export default VideoChat;
