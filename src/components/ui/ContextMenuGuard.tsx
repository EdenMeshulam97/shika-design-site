"use client";

import { useEffect } from "react";

// Turns off the browser's right-click menu and image dragging site-wide, so the project photos
// can't be grabbed with "Save image as…" or by dragging them to the desktop.
// Text fields keep their menu so visitors can still paste into forms.
export default function ContextMenuGuard() {
  useEffect(() => {
    const isEditable = (target: EventTarget | null) =>
      target instanceof HTMLElement && !!target.closest("input, textarea, [contenteditable='true']");

    const onContextMenu = (e: MouseEvent) => {
      if (!isEditable(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
