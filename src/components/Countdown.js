import React, { useState, useEffect } from "react";

const calculateTimeLeft = (dateString) => {
  const targetTime = new Date(`${dateString}T00:00:00`).getTime();
  const now = new Date().getTime();
  const diff = targetTime - now;

  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds };
};

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(date));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(date));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [date]);

  if (!timeLeft) {
    return <p>Sự kiện đã diễn ra</p>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <p>{`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`}</p>
  );
};

export default Countdown;
