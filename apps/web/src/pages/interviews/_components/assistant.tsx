/* eslint-disable @typescript-eslint/ban-ts-comment */
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import { PhoneOffIcon } from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/index";

function Assistant() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { loading, error, data } = useSelector((state: RootState) => state.ai);

  useEffect(() => {
    const vapiInstance = new Vapi("784f9f0c-9530-4cd0-acbf-bbd4bcd3f80f");
    // @ts-ignore
    setVapi(vapiInstance);
    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });
    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  useEffect(() => {
    if (!loading && vapi && data) {
      const assistantOverrides = {
        variableValues: {
          problemTitle: JSON.parse(
            // @ts-ignore
            data?.replace(/```[a-zA-Z]*\n?/g, "").trim(),
          ).title,
          problemDescription: JSON.parse(
            // @ts-ignore
            data?.replace(/```[a-zA-Z]*\n?/g, "").trim(),
          ).content,
        },
      };
      console.log(data)
      vapi.start("beb52f28-a69e-403e-a106-1ed6c664fbad", assistantOverrides);
      console.log("started");
    }
  }, [vapi, loading,data]);

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  if (error) {
    return <></>;
  }

  return (
    isConnected && (
      <motion.div
        className={`absolute bg-slate-50 ${isSpeaking ? "shadow-2xl" : ""} w-72 h-56 z-30 p-2`}
        initial={{
          y: 100,
          x: 300,
        }}
        drag
        dragConstraints={{
          left: 0,
          right: 600,
          bottom: 800,
          top: 100,
        }}
      >
        <div className={`flex flex-col justify-center items-center w-full`}>
          <div className="w-72 h-40 flex flex-col items-center justify-center ">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
              {isSpeaking && (
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              )}
            </Avatar>
          </div>
          <button
            onClick={endCall}
            className="bg-red-500 text-white p-3 text-center flex flex-col items-center w-1/2 rounded-md "
          >
            <PhoneOffIcon />
          </button>
        </div>
      </motion.div>
    )
  );
}

export default Assistant;
