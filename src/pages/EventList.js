import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onRegister, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const filteredEvents = events.filter((event) => {
    const matchesName = event.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const isFull = event.registered >= event.capacity;
    let matchesStatus = true;

    if (statusFilter === "Còn chỗ") {
      matchesStatus = !isFull;
    } else if (statusFilter === "Đã đầy") {
      matchesStatus = isFull;
    }

    return matchesName && matchesStatus;
  });

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <p>{`Tìm thấy ${filteredEvents.length} sự kiện`}</p>
      {filteredEvents.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <EventTable
          events={filteredEvents}
          onRegister={onRegister}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default EventList;
