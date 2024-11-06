import Link from 'next/link';
import { pages } from '../constants/index';

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="font-bold mt-2 text-center text-xl">
        Keep your Business records{' '}
        <span className="text-xl text-indigo-500">Simplified</span>
      </h1>
      <div className="w-full sm:w-5/6 mx-auto shadow-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link
          href={page.link}
            key={page.name}
            className="w-full h-32 bg-gray-200 p-4 rounded-lg shadow-md mx-auto mb-4 shadow-indigo-500/50"
          >
            <div  className="text-xl font-semibold text-indigo-500">
              {page.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
