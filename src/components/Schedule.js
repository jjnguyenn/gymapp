import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";  
import interactionPlugin from "@fullcalendar/interaction";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../Firebase";
import { useAuth0 } from "@auth0/auth0-react";

const Schedule = () => {
  const { user, isAuthenticated } = useAuth0();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [viewType, setViewType] = useState("dayGridMonth"); 
  const [selectedType, setSelectedType] = useState(""); 

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchEvents = async () => {
      const colRef = collection(db, "users", user.sub, "calendar");
      const snapshot = await getDocs(colRef);
      const userEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEvents(userEvents);
      setFilteredEvents(userEvents); 
    };

    fetchEvents();
  }, [isAuthenticated, user]);

  const handleDateClick = async (arg) => {
    const title = prompt("Enter workout (e.g. 🏃 Cardio, 🏋️ Chest Day)");
    if (title) {
      const newEvent = { title, date: arg.dateStr };
      const docRef = await addDoc(collection(db, "users", user.sub, "calendar"), newEvent);
      setEvents([...events, { ...newEvent, id: docRef.id }]);
      setFilteredEvents([...filteredEvents, { ...newEvent, id: docRef.id }]);
    }
  };

  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Delete "${clickInfo.event.title}"?`)) {
      await deleteDoc(doc(db, "users", user.sub, "calendar", clickInfo.event.id));
      setEvents(events.filter(e => e.id !== clickInfo.event.id));
      setFilteredEvents(filteredEvents.filter(e => e.id !== clickInfo.event.id));
    }
  };

  const handleEventDrop = async (changeInfo) => {
    const { event } = changeInfo;
    const updatedDate = event.startStr;
    const eventId = event.id;


    await updateDoc(doc(db, "users", user.sub, "calendar", eventId), {
      date: updatedDate,
    });

  
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, date: updatedDate } : e))
    );
    setFilteredEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, date: updatedDate } : e))
    );
  };

  const handleViewChange = (view) => {
    setViewType(view);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);

    if (type === "") {
      setFilteredEvents(events); // Show all events
    } else {
      setFilteredEvents(events.filter(event => event.title.includes(type))); // Filter events by type
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-teal-600 mb-4 text-center">🗓️ Workout Schedule</h2>

    
      <div className="flex justify-between items-center mb-4">
        <select 
          className="px-4 py-2 border rounded-md bg-teal-100 dark:bg-teal-700 dark:text-white"
          onChange={handleFilterChange}
          value={selectedType}
        >
          <option value="">Filter by Type (All)</option>
          <option value="🏋️">Strength</option>
          <option value="🏃">Cardio</option>
          <option value="🧘‍♀️">Yoga</option>
          <option value="🚴‍♂️">Cycling</option>
        </select>

        <div>
          <button
            onClick={() => handleViewChange("dayGridMonth")}
            className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-lg"
          >
            Month View
          </button>
          <button
            onClick={() => handleViewChange("timeGridWeek")}
            className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-lg"
          >
            Week View
          </button>
          <button
            onClick={() => handleViewChange("timeGridDay")}
            className="px-4 py-2 mx-2 bg-teal-500 text-white rounded-lg"
          >
            Day View
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={viewType}
        events={filteredEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        editable={true}
        eventDisplay="block"
        height="auto"
        eventMouseEnter={(info) => {
          
          const title = info.event.title;
          const date = info.event.start.toLocaleString();
          info.el.setAttribute('title', `${title} - ${date}`);
        }}
      />
    </div>
  );
};

export default Schedule;
