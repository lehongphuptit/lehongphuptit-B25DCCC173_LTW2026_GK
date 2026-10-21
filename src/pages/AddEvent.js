import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !date || capacity === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const capacityNum = Number(capacity);
    if (
      !Number.isInteger(capacityNum) ||
      capacityNum < 10 ||
      capacityNum > 1000
    ) {
      setError("Sức chứa phải từ 10 đến 1000");
      return;
    }

    setError("");
    onAdd({
      name: name.trim(),
      location: location.trim(),
      date,
      capacity: capacityNum,
    });

    navigate("/events", { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event-name">Tên sự kiện</label>
          <input
            id="event-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-location">Địa điểm</label>
          <input
            id="event-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Ngày diễn ra</label>
          <input
            id="event-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-capacity">Sức chứa</label>
          <input
            id="event-capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AddEvent;
