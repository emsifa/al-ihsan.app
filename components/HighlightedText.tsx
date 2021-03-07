import { FC } from "react";

function highlight(text: string, regex: RegExp | null): string {
  return regex ? text.replace(regex, "<u class='text-primary'>$&</u>") : text;
}

const HighlightedText: FC<{ text: string; regex: RegExp | null }> = ({
  text,
  regex,
}) => (
  <span
    dangerouslySetInnerHTML={{
      __html: highlight(text, regex),
    }}
  />
);

export default HighlightedText;
