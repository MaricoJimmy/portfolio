interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="tech-label" data-text={eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  );
}
