export function isEnterKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return event.key === "Enter";
}

export function isNumberKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return true;
    default:
      return false;
  }
}

export function isBackspaceKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return event.key === "Backspace";
}

export function isDeleteKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return event.key === "Delete";
}

export function isTabKey(event: React.KeyboardEvent | KeyboardEvent): boolean {
  return event.key === "Tab";
}

export function isArrowKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      return true;
    default:
      return false;
  }
}
