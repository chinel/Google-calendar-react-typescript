import { useId } from "react";
import { Event } from "../context/Events";
import { formatDate } from "../utils/formatDate";
import { UnionOmit } from "../utils/types";
import Modal, { ModalProps } from "./Modal";

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
  const isNew = event == null;
  const formId = useId();
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
      <form>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input type="text" name="name" id={`${formId}-name`} />
        </div>
        <div className="form-group checkbox">
          <input type="checkbox" name="all-day" id={`${formId}-all-day`} />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input type="time" name="start-time" id={`${formId}-start-time`} />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input type="time" name="end-time" id={`${formId}-end-time`} />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            <input
              type="radio"
              name="color"
              value="blue"
              id={`${formId}-blue`}
              checked
              className="color-radio"
            />
            <label htmlFor={`${formId}-blue`}>
              <span className="sr-only">Blue</span>
            </label>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            Add
          </button>
          <button className="btn btn-delete" type="button">
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
