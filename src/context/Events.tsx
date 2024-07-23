import { createContext } from "react";
import { UnionOmit } from "../utils/types";
import { EVENT_COLORS } from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";

export type Event = {
  id: string;
  name: string;
  color: (typeof EVENT_COLORS)[number];
  date: Date;
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime?: never; endTime?: never }
);

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
  updateEvent: (id: string, event: UnionOmit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
};

type EventsProviderProps = {
  children: React.ReactNode;
};

export const Context = createContext<EventsContext | null>(null);

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useLocalStorage("EVENTS", []);

  function addEvent(eventDetails: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...eventDetails, id: crypto.randomUUID() }]);
  }

  function updateEvent(id: string, eventDetails: UnionOmit<Event, "id">) {
    setEvents((e) => {
      return e.map((event) => {
        return event.id === id ? { id, ...eventDetails } : event;
      });
    });
  }

  function deleteEvent(id: string) {
    setEvents((e) => {
      return e.filter((event) => event.id !== id);
    });
  }

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
}
