type EventFormModalprops = {};
export default function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalprops) {
  return <Modal {...modalProps}></Modal>;
}
