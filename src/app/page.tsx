"use client";

import { useState } from "react";
import PiFooter from "./components/PiFooter";
import PiHeader from "./components/PiHeader";
import PiTracker from "./components/PiTracker";

export default function Home() {
  const [readerVersion, setReaderVersion] = useState("");

  return (
    <>
      <div className="w-full h-full">
        <PiHeader />
        <PiTracker readerVersion={readerVersion} />
        <PiFooter />
      </div>
    </>
  );
}
