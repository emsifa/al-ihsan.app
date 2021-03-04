export function classNames(
  classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter((cls) => typeof cls === "string" && cls).join(" ");
}

type ClassProp = null | undefined | string | string[];

export function mergeClasses(classA: ClassProp, classB: ClassProp): string {
  const toArray = (classes: ClassProp) =>
    typeof classes === "string" ? classes.split(" ") : [...classes];

  return [...toArray(classA || []), ...toArray(classB || [])].join(" ");
}
