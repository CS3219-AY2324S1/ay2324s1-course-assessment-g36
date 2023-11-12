import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

export const useClient = createClient({ mode: "rtc", codec: "vp8" });
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
