export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-12">
      <div className="container mx-auto px-4 py-6 text-xs text-gray-600 text-center">
        © {new Date().getFullYear()} El Clú del Boardgame
      </div>
    </footer>
  );
}
