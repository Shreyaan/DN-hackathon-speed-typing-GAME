import Router from "next/router";

export function gameLogic(
  timeLeft,
  typedText,
  setIsPlaying,
  startTime,
  intervalId,
  setTimeLeft,
  isPlaying,
  setWpm,
  duration,
  setAccuracy,
  referenceText
) {
  if (timeLeft > 0 && typedText) {
    setIsPlaying(true);
    startTime.current = Date.now();
    intervalId.current = setInterval(() => {
      const elapsedTime = (Date.now() - startTime.current) / 100;
      setTimeLeft((prevTimeLeft) => prevTimeLeft - elapsedTime);
      startTime.current = Date.now();
    }, 100);
  } else {
    if (isPlaying === true) {
      //game finish code
      setWpm(typedText.split(" ").length / (duration / 60));

      setAccuracy(
        (typedText.split("").reduce((acc, curr, index) => {
          if (curr === referenceText[index]) {
            return acc + 1;
          }
          return acc;
        }, 0) /
          referenceText.length) *
          100
      );
    }
    setIsPlaying(false);
    // wait 5millisec before redirecting to result page

    if (timeLeft <= 0)
      setTimeout(() => {
        Router.push("/result");
      }, 50);
    clearInterval(intervalId.current);
  }
}
