export default function ProductList({ products, onDetail }) {
  return (
    <div className="grid gap-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded cursor-pointer hover:shadow-md"
          onClick={() => onDetail(p.id)} // panggil callback untuk navigasi ke detail
        >
          <h2 className="font-bold">{p.name}</h2>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
