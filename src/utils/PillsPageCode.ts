export const pillBasicCode = `import Pill from "../components/pills/Pill";

<Pill>Basic Pill</Pill>`;

export const pillVariantsCode = `<div className="flex gap-2 flex-wrap">
  <Pill>Default</Pill>
  <Pill className="pill-primary">Primary</Pill>
  <Pill className="pill-success">Success</Pill>
  <Pill className="pill-warning">Warning</Pill>
  <Pill className="pill-danger">Danger</Pill>
</div>`;

export const pillInteractiveCode = `<Pill 
  onClick={() => console.log('Pill clicked!')}
>
  Clickable Pill
</Pill>`;

export const pillCloseableCode = `const [pills, setPills] = React.useState([
  { id: 1, text: 'Tag 1' },
  { id: 2, text: 'Tag 2' },
  { id: 3, text: 'Tag 3' }
]);

<div className="flex gap-2 flex-wrap">
  {pills.map(pill => (
    <Pill 
      key={pill.id}
      onClose={() => setPills(pills.filter(p => p.id !== pill.id))}
    >
      {pill.text}
    </Pill>
  ))}
</div>`;

export const pillCustomStyleCode = `<Pill 
  style={{ 
    backgroundColor: '#3b82f6', 
    color: 'white',
    padding: '0.5rem 1rem',
    fontSize: '1rem'
  }}
>
  Custom Styled Pill
</Pill>`;
