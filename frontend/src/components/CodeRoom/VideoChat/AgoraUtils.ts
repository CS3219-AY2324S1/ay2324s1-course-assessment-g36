import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

import { RtcTokenBuilder, RtcRole } from "agora-token";

export const useClient = createClient({ mode: "rtc", codec: "vp8" });
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const AGORA_APP_ID = "07a3b6e024c94596ae016c0bb2646e38";
export const AGORA_APP_CERTIFICATE = "201827a36cb44e3c9086019cca1eaa48";
const TOKEN_EXPIRE_TIME = 3600;

export const generateAccessToken = (roomId: string) =>
  RtcTokenBuilder.buildTokenWithUid(
    AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    roomId,
    "",
    RtcRole.PUBLISHER,
    TOKEN_EXPIRE_TIME,
    TOKEN_EXPIRE_TIME,
  );
