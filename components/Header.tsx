import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-cluGreen text-white">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link href="/">
          <a className="flex items-center mr-8">
            <Image src="/logo.svg" alt="El Clú del Boardgame" width={32} height={32} />
            <span className="ml-2 text-xl font-bold">El Clú del Boardgame</span>
          </a>
        </Link>
        {/* …resto del header… */}
      </div>
    </header>
  );
}
