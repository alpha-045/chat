import { useEffect, useState } from "react";

import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

export default function CallV({ setved }) {
  const { authUser, callf, token, callId, apikey } = useAuthStore();

  // Store client and call in state so React re-renders when they are ready
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: fetch token/callId/apikey from backend
  useEffect(() => {
    callf();
  }, []);

  // Step 2: only create client+call AFTER token, callId, apikey are available
  useEffect(() => {
    // Wait until all three values are filled in
    if (!token || !callId || !apikey) return;

    let streamClient;
    let streamCall;

    const startCall = async () => {
      try {
        setLoading(true);

        streamClient = new StreamVideoClient({
          apiKey: apikey,
          user: {
            id: authUser._id.toString(),   // must be a string
            name: authUser.fullname,
            image:
              authUser.profilepic ||
              `https://getstream.io/random_svg/?id=${authUser._id}&name=${authUser.fullname}`,
          },
          token: token,
        });

        streamCall = streamClient.call("default", callId);
        await streamCall.join({ create: true });

        setClient(streamClient);
        setCall(streamCall);
        setLoading(false);
      } catch (err) {
        console.error("Video call error:", err);
        setError("Failed to connect to the call. Please try again.");
        setLoading(false);
      }
    };

    startCall();

    // Cleanup: disconnect when component unmounts
    return () => {
      if (streamCall) streamCall.leave().catch(console.error);
      if (streamClient) streamClient.disconnectUser().catch(console.error);
    };
  }, [token, callId, apikey]); // runs when these values become available

  const handleClose = async () => {
    if (call) await call.leave().catch(console.error);
    if (client) await client.disconnectUser().catch(console.error);
    setved(false);
  };

  return (
    <div className="h-full relative flex flex-col items-center justify-center bg-gray-900">
      {/* Close button */}
      <button
        className="absolute top-2 right-2 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 cursor-pointer"
        onClick={handleClose}
      >
        <X size={24} />
      </button>

      {/* Loading state */}
      {loading && (
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>Connecting to call...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-red-400 text-center p-4">
          <p>{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setError(null);
              setLoading(true);
              callf();
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Stream Video UI — only rendered when client and call are ready */}
      {!loading && !error && client && call && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyUILayout />
          </StreamCall>
        </StreamVideo>
      )}
    </div>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="text-white text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2" />
        <p>Joining call...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </div>
  );
};
