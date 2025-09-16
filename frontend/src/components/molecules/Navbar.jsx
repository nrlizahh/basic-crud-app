export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wider">
        MyLogo
      </div>

      {/* Tombol Login */}
      <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg font-semibold">
        Login
      </button>
    </nav>
  );
}
