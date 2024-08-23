import React, { useState, useRef, useEffect } from "react";
import SaleImg from "../../assets/saleBanner.png";

const SaleSection = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const interval = useRef(null);

  const startTimer = () => {
    const countDownDate = new Date("2024-09-25T00:00:00").getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerDays(String(days).padStart(2, "0"));
      setTimerHours(String(hours).padStart(2, "0"));
      setTimerMinutes(String(minutes).padStart(2, "0"));
      setTimerSeconds(String(seconds).padStart(2, "0"));

      if (distance < 0) {
        clearInterval(interval.current);
        setTimerDays("00");
        setTimerHours("00");
        setTimerMinutes("00");
        setTimerSeconds("00");
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <section className="h-[550px] w-full bg-banner-bg px-8">
      <div className="grid h-full grid-cols-2 px-12">
        <div className="overflow-hidden p-4">
          <img className="object-cover" src={SaleImg} alt="" />
        </div>
        <div className="flex h-full flex-col justify-center p-4">
          <div className="mb-5">
            <h2 className="mb-4 text-base-2 font-semibold uppercase text-red-600">
              Sale up to 60%
            </h2>
            <h1 className="mb-2 text-h2 font-semibold">
              Blue classic long sleeves shirt
            </h1>
          </div>
          <div className="mb-6 flex gap-3">
            <div className="flex h-24 w-20 flex-col items-center justify-between rounded-md border border-black px-2 py-4">
              <span className="text-h2 font-semibold">{timerDays}</span>
              <p className="text-base-4 font-normal text-black">Days</p>
            </div>
            <div className="flex h-24 w-20 flex-col items-center justify-between rounded-md border border-black px-2 py-4">
              <span className="text-h2 font-semibold">{timerHours}</span>
              <p className="text-base-4 font-normal text-black">Hours</p>
            </div>
            <div className="flex h-24 w-20 flex-col items-center justify-between rounded-md border border-black px-2 py-4">
              <span className="text-h2 font-semibold">{timerMinutes}</span>
              <p className="text-base-4 font-normal text-black">Minutes</p>
            </div>
            <div className="flex h-24 w-20 flex-col items-center justify-between rounded-md border border-black px-2 py-4">
              <span className="text-h2 font-semibold">{timerSeconds}</span>
              <p className="text-base-4 font-normal text-black">Seconds</p>
            </div>
          </div>
          <div>
            <a
              className="flex h-12 w-fit items-center justify-center rounded-md bg-black11 px-8 text-base-4 text-white"
              href=""
            >
              <span>Shop Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleSection;
