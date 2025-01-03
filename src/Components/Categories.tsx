import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  title: string;
  cimage: string;
  link:string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Corrected path
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold mt-10 mb-8 text-center text-gray-800">
        Choose Different <span className="text-blue-600 font-bold">Category</span>
      </h1>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-5">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              rel="noopener noreferrer"
              className="relative group rounded-xl transition duration-300 hover:bg-black hover:bg-opacity-100 hover:text-white hover:cursor-pointer"
            >
              <Image
                src={category.cimage}
                alt={category.title}
                className="w-full h-48 object-cover rounded-xl opacity-80"
              />
              <div className="absolute inset-0 flex justify-center items-center rounded-xl bg-black bg-opacity-40 opacity-100 transition-opacity">
                <h2 className="text-white text-lg font-medium">{category.title}</h2>
              </div>
            </a>
          ))}
        </div>

      )}
      <Link href="/findwork">
        <button className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          More Categories
        </button>
      </Link>
    </div>
  );
}
