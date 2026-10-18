"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

function getSnapshot() {
  return document.visibilityState !== "hidden";
}

export function usePageVisibility() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
