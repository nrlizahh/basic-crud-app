export default function ProductList({ products, onDetail }) {
  
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => onDetail(p.id)}
          >
            <div className="w-30 h-30 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden mb-2">
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-base font-semibold text-black text-center">
              {p.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
