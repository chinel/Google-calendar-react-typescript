import { Key, ReactNode, useRef, useState } from "react";

type OverflowContainerProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderOverflow: (overflowAmount: number) => ReactNode;
  className?: string;
  getKey: (item: T) => Key;
};
export function OverflowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  const [overflowAmount, setOverflowAmount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div key={getKey(item)}>{renderItem(item)}</div>
        ))}
      </div>
      <div>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
