export default function SectionNumber({ number }: { number: string }) {
  return (
    <span className="section-number-ghost" aria-hidden="true">
      {number}
    </span>
  );
}
