import { FormEvent, Fragment, useId, useRef, useState } from "react";
import { Event } from "../context/Events";
import { formatDate } from "../utils/formatDate";
import { UnionOmit } from "../utils/types";
import Modal, { ModalProps } from "./Modal";
import { EVENT_COLORS } from "../utils/constants";

type EventFormModalprops = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | { onDelete: () => void; event: Event; date?: never }
  | { onDelete?: () => never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

export default function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalprops) {
  const [selectedColor, setSelectedColor] = useState(
    event?.color || EVENT_COLORS[0]
  );
  const [isAllDayChecked, setIsAllDayChecked] = useState(
    event?.allDay || false
  );
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const endTimeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const isNew = event == null;
  const formId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const endTime = endTimeRef.current?.value;

    if (name == null || name == "") {
      return;
    }

    const commonProps = {
      name,
      date: date || event?.date,
      color: selectedColor,
    };

    let newEvent: UnionOmit<Event, "id">;

    if (isAllDayChecked) {
      newEvent = {
        ...commonProps,
        allDay: true,
      };
    } else {
      if (
        startTime == null ||
        startTime == "" ||
        endTime == null ||
        endTime == ""
      ) {
        return;
      }

      newEvent = {
        ...commonProps,
        allDay: false,
        startTime,
        endTime,
      };
      modalProps.onClose();
      onSubmit(newEvent);
    }
  };

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>
          {formatDate(date || event.date, {
            dateStyle: "short",
          })}
        </small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input required type="text" id={`${formId}-name`} ref={nameRef} />
        </div>
        <div className="form-group checkbox">
          <input
            checked={isAllDayChecked}
            onChange={(e) => setIsAllDayChecked(e.target.checked)}
            type="checkbox"
            id={`${formId}-all-day`}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              type="time"
              id={`${formId}-start-time`}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              min={startTime}
              type="time"
              id={`${formId}-end-time`}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              ref={endTimeRef}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {EVENT_COLORS.map((color) => (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`${formId}-${color}`}
                  checked={selectedColor === color}
                  className="color-radio"
                  onChange={() => setSelectedColor(color)}
                />
                <label htmlFor={`${formId}-${color}`}>
                  <span className="sr-only">{color}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete !== null && (
            <button className="btn btn-delete" onClick={onDelete} type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
