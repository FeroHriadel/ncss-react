export const cardBasicCode = `import Card from "../components/cards/Card";

<Card>
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-700">This is a basic card with some content inside.</p>
</Card>`;

export const cardStyledCode = `<Card 
  className="bg-blue-50 border-2 border-blue-300"
  style={{ padding: '2rem' }}
>
  <h3 className="text-xl font-semibold mb-2 text-blue-900">Styled Card</h3>
  <p className="text-blue-800">This card has custom background, border, and padding.</p>
</Card>`;

export const cardNestedCode = `<Card className="bg-gray-100 p-6">
  <h3 className="text-xl font-semibold mb-4">Parent Card</h3>
  <div className="space-y-4">
    <Card className="bg-white p-4">
      <h4 className="font-semibold mb-2">Child Card 1</h4>
      <p className="text-gray-700 text-sm">Nested content here.</p>
    </Card>
    <Card className="bg-white p-4">
      <h4 className="font-semibold mb-2">Child Card 2</h4>
      <p className="text-gray-700 text-sm">More nested content.</p>
    </Card>
  </div>
</Card>`;
