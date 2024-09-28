'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <p className="text-xl font-bold">RxCampanhas</p>
          </div>
          <nav className="flex flex-col lg:flex-row gap-4">
            <li className="list-none">
              <Link href="/about">
                <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Sobre</p>
              </Link>
            </li>
            <li className="list-none">
              <Link href="/services">
                <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Serviços</p>
              </Link>
            </li>
            <li className="list-none">
              <Link href="/contact">
                <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Contato</p>
              </Link>
            </li>
            <li className="list-none">
              <Link href="/privacy">
                <p className="text-lg font-medium hover:text-yellow-400 transition-colors">Privacidade</p>
              </Link>
            </li>
          </nav>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2024 RxCampanhas. Todos os direitos reservados.</p>
          <Link href="https://www.removeragua.com">removeragua.com</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
