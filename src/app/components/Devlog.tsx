import React from "react";

const Devlog = () => {
  return (
    <div>
      <p className="">
        <span className="font-extrabold">Dev Log:</span>
      </p>
      <br />
      June 04, 2024: Adds CSS styling for borders and fonts. Introducs new
      colors compatible for sleep.
      <br />
      June 03, 2024: Adds logic to autoplay.
      <br />
      June 02, 2024: Adds barebone header, body and footer components with basic
      CSS styling for sleepy-pi project.
      <br />
      May 28, 2024: Initializes sleepy-pi project. Must figure out logic in code
      to autoplay audio files after each number and iterate through the next
      <br />
      <p>
        <span className="font-semibold">Introduction: </span>
        Welcome to the sleepaid made by Andrew Choi! Kdrama inspired, hoping the
        sound of my voice reciting 48000 digits of Pi helps you fall asleep. No
        experience in ASMR but hopefully this helps you fall asleep{" "}
        <span className="font-semibold">{"> _<"}.</span>
        <br />
        <br />
        <span className="font-semibold">
          Future plans for this development:
        </span>
      </p>
      <li>
        combination tone: this is a wild idea but you can expect to hear a
        randomized voice between low and high tones!
      </li>
      <li>
        Random numbers instead of Pi: you might get used to the first 200
        sequence of numbers before you fall asleep. Sometimes for me, I have to
        switch to a different video while falling asleep. With the random
        numbers, you will never know what to expect except the unexpected!{" "}
        {">:D"}
      </li>
      <li>
        Risque-esque: ooh hoo hoo. This might be my most daring contribution to
        society. And I hope no one finds out about this one. I might add some
        stuff in here such as moaning or ASMR pillow talk. who knows if I'll
        have time for this tho? because where would I even record this? HAHA.
      </li>
    </div>
  );
};

export default Devlog;
