export default function Card({ title, number }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg">
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{number}</p>
    </div>
  );
}
