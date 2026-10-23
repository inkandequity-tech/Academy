import { MODULES, TOTAL_LESSONS, TOTAL_MINUTES, type ModuleOutline } from "@/content/outline";
import { facultyById } from "@/content/faculty";
import { ACADEMY } from "@/lib/config";

export function hours(min: number) {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} h ${m ? `${m} min` : ""}`.trim() : `${m} min`;
}

export function leadNames(m: ModuleOutline) {
  return m.leads.map((id) => facultyById(id).name).join(" and ");
}

type Status = { label: string; kind: "free" | "done" | "lock" | "plain" };

/**
 * The course drawn as a cause list: one item per module, the advocate it is "before",
 * and what it is listed for. `status` lets the dashboard show progress in the same board.
 */
export function CauseList({ title = `Cause list: ${ACADEMY.course}`, status, headingLevel = 2 }: {
  title?: string;
  status?: (m: ModuleOutline) => Status;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const def = (m: ModuleOutline): Status => (m.free ? { label: "Free to all", kind: "free" } : { label: hours(m.lessons.reduce((a, l) => a + l.minutes, 0)), kind: "plain" });
  return (
    <section className="board" aria-label="Course cause list">
      <div className="board-head">
        <H>{title}</H>
        <p>{MODULES.length} items, {TOTAL_LESSONS} lessons, about {Math.round(TOTAL_MINUTES / 60)} hours of hearing</p>
      </div>
      <div className="board-cols" aria-hidden="true">
        <span>Item</span><span>Matter</span><span>Before</span><span style={{ textAlign: "right" }}>Listed for</span>
      </div>
      <ol>
        {MODULES.map((m) => {
          const s = (status ?? def)(m);
          return (
            <li key={m.slug}>
              <a className="item" href={`/course/${m.slug}`}>
                <span className="item-no" aria-label={`Item ${m.number}`}>{m.number}</span>
                <span className="item-title">{m.title}<small>{m.summary}</small></span>
                <span className="item-before">{leadNames(m)}</span>
                <span className="item-stage">{s.kind === "plain" ? s.label : <span className={`tag ${s.kind}`}>{s.label}</span>}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="board-foot">
        <span>Final examination and certificate follow item {MODULES.length}.</span>
        <span>Taught by the advocates of {ACADEMY.firm}, Lucknow</span>
      </div>
    </section>
  );
}
