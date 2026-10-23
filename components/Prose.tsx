import { Fragment } from "react";

/** Renders lesson notes: blank-line-separated paragraphs, and "- " lines as a list. Italicises case names written _like this_. */
export function Prose({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        const intro = lines.filter((l) => !l.startsWith("- "));
        const items = lines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
        return (
          <Fragment key={i}>
            {intro.length > 0 && <p>{intro.join(" ")}</p>}
            {items.length > 0 && <ul>{items.map((it, j) => <li key={j}>{it}</li>)}</ul>}
          </Fragment>
        );
      })}
    </div>
  );
}
