"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reorderList } from "./worksheetReorder";

export type PointerDragState = {
  fromIndex: number;
  overIndex: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

type Identifiable = { id: string };

export function usePointerReorder<T extends Identifiable>(
  items: T[],
  onReorder: (items: T[]) => void,
) {
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const [drag, setDrag] = useState<PointerDragState | null>(null);
  const itemElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  const displayItems =
    drag !== null ? reorderList(items, drag.fromIndex, drag.overIndex) : items;

  const draggedItem = drag !== null ? items[drag.fromIndex] ?? null : null;

  const setItemRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) itemElementsRef.current.set(id, el);
    else itemElementsRef.current.delete(id);
  }, []);

  const findOverIndex = useCallback((clientY: number, ordered: T[]) => {
    for (let i = 0; i < ordered.length; i++) {
      const el = itemElementsRef.current.get(ordered[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) return i;
    }
    return Math.max(ordered.length - 1, 0);
  }, []);

  const startDrag = useCallback(
    (index: number, e: React.PointerEvent<HTMLElement>, rowElement: HTMLElement) => {
      if (items.length <= 1) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = rowElement.getBoundingClientRect();
      setDrag({
        fromIndex: index,
        overIndex: index,
        x: e.clientX,
        y: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        width: rect.width,
        height: rect.height,
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (!drag) return;

    const onMove = (e: PointerEvent) => {
      setDrag((prev) => {
        if (!prev) return null;
        const preview = reorderList(itemsRef.current, prev.fromIndex, prev.overIndex);
        const overIndex = findOverIndex(e.clientY, preview);
        if (
          overIndex === prev.overIndex &&
          prev.x === e.clientX &&
          prev.y === e.clientY
        ) {
          return prev;
        }
        return {
          ...prev,
          x: e.clientX,
          y: e.clientY,
          overIndex,
        };
      });
    };

    const onEnd = () => {
      setDrag((prev) => {
        if (prev && prev.fromIndex !== prev.overIndex) {
          onReorder(reorderList(itemsRef.current, prev.fromIndex, prev.overIndex));
        }
        return null;
      });
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  }, [drag !== null, findOverIndex, onReorder]);

  const isPlaceholder = useCallback(
    (item: T) => draggedItem !== null && item.id === draggedItem.id,
    [draggedItem],
  );

  return {
    displayItems,
    drag,
    draggedItem,
    isDragging: drag !== null,
    isPlaceholder,
    setItemRef,
    startDrag,
  };
}
