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
    <div className=" h-screen bg-purple-500">
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
      <div>
        <p className="">
          <span className="font-extrabold">Dev Logs:</span>
        </p>
        <p>
          <span className="font-semibold">Introduction</span>
          Welcome to the sleepaid made by Andrew Choi! This was inspired by a
          Kdrama and I hope the sound of my voice reciting 48000 digits of Pi
          helps you fall asleep. Now, I do not have any experience in ASMR but
          hopefully this helps you fall asleep {"> _<"}.
          <br />
          <span className="font-semibold">
            Future plans for this development:
          </span>
          <li>
            combination tone: this is a wild idea but you can expect to hear a
            randomized voice between low and high tones!
          </li>
          <li>
            Random numbers instead of Pi: you might get used to the first 200
            sequence of numbers before you fall asleep. Sometimes for me, I have
            to switch to a different video while falling asleep. With the random
            numbers, you will never know what to expect except the unexpected!{" "}
            {">:D"}
          </li>
          <li>
            Risque-esque: ooh hoo hoo. This might be my most daring contribution
            to society. And I hope no one finds out about this one. I might add
            some stuff in here such as moaning or ASMR pillow talk. who knows if
            I'll have time for this tho? because where would I even record this?
            HAHA.
          </li>
        </p>
      </div>
      <audio ref={audioRef}></audio> {/* Add the audio element */}
    </div>
  );
};

export default PiTracker;
