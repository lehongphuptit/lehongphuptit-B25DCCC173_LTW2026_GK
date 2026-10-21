import React from "react";

const Home = ({ events }) => {
  const totalEvents = events.length;
  const totalRegistered = events.reduce(
    (sum, item) => sum + item.registered,
    0
  );
  const fullEventsCount = events.filter(
    (item) => item.registered >= item.capacity
  ).length;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p>{`Tổng số sự kiện: ${totalEvents}`}</p>
      <p>{`Tổng số lượt đăng ký: ${totalRegistered}`}</p>
      <p>{`Số sự kiện đã đầy: ${fullEventsCount}`}</p>
    </div>
  );
};

export default Home;
