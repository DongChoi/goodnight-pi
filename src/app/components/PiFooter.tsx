import Link from "next/link";
import React from "react";

const PiFooter = () => {
  return (
    <div className="flex justify-center items-center h-12 bg-gray-700 text-white py-4">
      <Link legacyBehavior href="https://burritoandmiso.andrewchoi.dev">
        Navigate back to Lovers Station
      </Link>
    </div>
  );
};

export default PiFooter;
