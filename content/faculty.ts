// Faculty are the advocates of Ink & Equity, as listed on ieqlaw.com/about.html.
// Only what the firm site already states is repeated here. No enrolment numbers.
// Module leads are a proposal for the partners to confirm (see README).

export type Faculty = {
  id: string;
  name: string;
  role: string;
  focus: string;
  photo: string;
};

export const FACULTY: Faculty[] = [
  { id: "rishabh", name: "Rishabh Raj", role: "Founding partner, Ink & Equity", focus: "Constitutional and writ matters, property, service matters, cyber crime.", photo: "/faculty/rishabh.webp" },
  { id: "vedant", name: "Vedant Bhargav", role: "Managing partner, Ink & Equity", focus: "Family law, criminal law, contract and civil litigation.", photo: "/faculty/vedant.webp" },
  { id: "radhika", name: "Radhika Singh", role: "Partner, Ink & Equity", focus: "Tax, constitutional and service matters.", photo: "/faculty/radhika.webp" },
  { id: "hanumant", name: "Hanumant Lal Srivastava", role: "Partner, Ink & Equity", focus: "Civil and criminal matters in the trial courts.", photo: "/faculty/hanumant.webp" },
  { id: "gokel", name: "Gokel Seth", role: "Junior partner, Ink & Equity", focus: "Property and real estate, RERA, development authority and tenancy matters.", photo: "/faculty/gokel.webp" },
  { id: "richa", name: "Richa Mishra", role: "Junior partner, Ink & Equity", focus: "Tax, constitutional and service matters.", photo: "/faculty/richa.webp" },
  { id: "kanchan", name: "Kanchan Srivastava", role: "Junior partner, Ink & Equity", focus: "Civil and criminal matters in the trial courts.", photo: "/faculty/kanchan.webp" },
];

export function facultyById(id: string): Faculty {
  const f = FACULTY.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown faculty id: ${id}`);
  return f;
}

/** Guest advocates are added here once confirmed. Leave empty until then. */
export const GUESTS: { name: string; note: string }[] = [];
