"use client";

import PIE_48000 from "@/data/pi_48000_digits";
import React, { useEffect, useRef, useState } from "react";

interface AudioFilePath {
  low: string;
  high: string;
}

interface Controller {
  piPointer: number;
  readVersion: keyof AudioFilePath;
}

const initialController: Controller = { piPointer: 0, readVersion: "low" };

const PiTracker = ({ readerVersion }: { readerVersion: string }) => {
  const [controller, setController] = useState<Controller>(initialController);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFiles: AudioFilePath = {
    low: "/sounds/low",
    high: "/sounds/high",
  };

  const handleReadPiStart = () => {
    if (controller.piPointer >= 48002) {
      return;
    }
    console.log("handleReadPiStart");
    playCurrentAudio();
  };

  const playCurrentAudio = () => {
    console.log("playCurrentAudio initiated");
    const currentAudio =
      controller.piPointer === 1
        ? `${audioFiles[controller.readVersion]}/point.wav`
        : `${audioFiles[controller.readVersion]}/${
            PIE_48000[controller.piPointer]
          }.wav`;
    if (audioRef.current && currentAudio) {
      audioRef.current.src = currentAudio;
      audioRef.current.play();
    }
  };

  // Effect to set up the 'ended' event listener for the audio element
  useEffect(() => {
    const handleAudioEnded = () => {
      setController((prevState) => {
        const newPointer = prevState.piPointer + 1;
        if (newPointer >= 48002) {
          return prevState; // Stop incrementing if the limit is reached
        }
        return {
          ...prevState,
          piPointer: newPointer,
        };
      });
    };

    if (audioRef.current) {
      console.log("Setting up event listener");
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, []);

  // Effect to play the next audio file when the piPointer changes
  useEffect(() => {
    if (controller.piPointer > 0 && controller.piPointer < 48002) {
      playCurrentAudio();
    }
  }, [controller.piPointer]);

  const resetController = (version: keyof AudioFilePath): void => {
    // Pause the audio if it's currently playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Reset the controller state
    setController({
      piPointer: 0,
      readVersion: version,
    });
  };

  return (
    <div>
      Available Options
      <button onClick={handleReadPiStart}>Start!</button>
      <li>
        <button onClick={() => resetController("low")}>low tone</button>
      </li>
      <li>
        <button
          onClick={() => {
            resetController("high");
          }}
        >
          high tone
        </button>
      </li>
      {/* <li>
        <button
          onClick={() => {
            setController((prevController) => ({
              ...initialController,
              readVersion: "combination",
            }));
          }}
        >
        combination tone
        </button>
      </li> */}
      <audio ref={audioRef}></audio> {/* Add the audio element */}
    </div>
  );
};

export default PiTracker;
