import { useEffect, useState } from "react";
import { AgoraVideoPlayer, IAgoraRTCRemoteUser } from "agora-rtc-react";
import {
  useMicrophoneAndCameraTracks,
  useClient,
  generateAccessToken,
} from "./AgoraUtils";
import { Controls } from "./Controls";
import { Box } from "@chakra-ui/react";
import styles from "./VideoChat.module.css";

interface IOwnProps {
  roomId: string;
}

const VideoChat = ({ roomId }: IOwnProps): JSX.Element => {
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

      const token = generateAccessToken(roomId);
      await client.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID || "",
        roomId,
        token,
        "",
      );
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      setStart(true);
    };

    if (ready && tracks) {
      init();
    }
  }, [ready, tracks, client, roomId]);

  useEffect(() => {
    return () => {
      tracks?.forEach((track) => track.close());
    };
  }, [tracks]);

  return (
    <Box
      position="fixed"
      bottom="0px"
      right="0px"
      margin="5px"
      display="flex"
      flexDir="row"
      gap="10px"
    >
      {start && tracks && (
        <>
          <AgoraVideoPlayer
            className={styles.agora_video}
            videoTrack={tracks[1]}
          />
          <Controls tracks={tracks} />
          {users.length > 0 && users[0].videoTrack && (
            <AgoraVideoPlayer
              className={styles.agora_video}
              videoTrack={users[0].videoTrack}
            />
          )}
        </>
      )}
    </Box>
  );
};
export default VideoChat;
