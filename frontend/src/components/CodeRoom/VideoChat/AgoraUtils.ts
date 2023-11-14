import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

import { RtcTokenBuilder, RtcRole } from "agora-token";

export const useClient = createClient({ mode: "rtc", codec: "vp8" });
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const TOKEN_EXPIRE_TIME = 3600;

export const generateAccessToken = (roomId: string) =>
  RtcTokenBuilder.buildTokenWithUid(
    process.env.NEXT_PUBLIC_AGORA_APP_ID || "",
    process.env.NEXT_PUBLIC_AGORA_APP_CERTIFICATE || "",
    roomId,
    "",
    RtcRole.PUBLISHER,
    TOKEN_EXPIRE_TIME,
    TOKEN_EXPIRE_TIME,
  );
