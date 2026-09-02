import { CART_STORAGE_KEY, emptyCart, parseCart, type CartState } from "./cart";

/**
 * Tiny external store around localStorage for useSyncExternalStore.
 * Snapshots are cached so React sees a stable reference between changes.
 */
type Snapshot = { ready: boolean; state: CartState };

const serverSnapshot: Snapshot = { ready: false, state: emptyCart };
let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartState {
  try {
    return parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return emptyCart;
  }
}

function emit() {
  for (const l of listeners) l();
}

export function getServerSnapshot(): Snapshot {
  return serverSnapshot;
}

export function getSnapshot(): Snapshot {
  snapshot ??= { ready: true, state: readStorage() };
  return snapshot;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CART_STORAGE_KEY || e.key === null) {
      snapshot = { ready: true, state: readStorage() };
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function update(updater: (prev: CartState) => CartState) {
  const next = updater(getSnapshot().state);
  snapshot = { ready: true, state: next };
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode / quota) – keep in-memory state.
  }
  emit();
}
