import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("gk_events");
    if (savedData) {
      setEvents(JSON.parse(savedData));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError("Không tải được dữ liệu");
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem("gk_events", JSON.stringify(events));
    }
  }, [events, loading, error]);

  const handleRegister = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((item) =>
        item.id === id && item.registered < item.capacity
          ? { ...item, registered: item.registered + 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((item) => item.id !== id));
  };

  const handleAdd = (newEventData) => {
    setEvents((prevEvents) => {
      const maxId = prevEvents.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0
      );
      const newEvent = {
        id: maxId + 1,
        ...newEventData,
        registered: 0,
      };
      return [...prevEvents, newEvent];
    });
  };

  const renderPage = (element) => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    return element;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={renderPage(<Home events={events} />)} />
        <Route
          path="events"
          element={renderPage(
            <EventList
              events={events}
              onRegister={handleRegister}
              onDelete={handleDelete}
            />
          )}
        />
        <Route
          path="events/new"
          element={renderPage(<AddEvent onAdd={handleAdd} />)}
        />
        <Route
          path="events/:id"
          element={renderPage(<EventDetail events={events} />)}
        />
      </Route>
    </Routes>
  );
};

export default App;
