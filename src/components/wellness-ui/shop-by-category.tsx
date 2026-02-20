import Link from 'next/link';

const mockCategories = [
    { id: '1', name: 'Cookware', slug: 'cookware', icon: '🍳' },
    { id: '2', name: 'Storage', slug: 'storage', icon: '🍱' },
    { id: '3', name: 'Utensils', slug: 'utensils', icon: '🥄' },
    { id: '4', name: 'Glassware', slug: 'glassware', icon: '🍷' },
    { id: '5', name: 'Textiles', slug: 'textiles', icon: '🧺' },
    { id: '6', name: 'Cleaning', slug: 'cleaning', icon: '🧽' },
];

export function ShopByCategory() {
    return (
        <section className="container-standard py-24">
            <h2 className="text-display-md mb-12 text-center text-stone-900">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {mockCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded-2xl p-2"
                    >
                        <div className="w-full aspect-square bg-surface-warm rounded-2xl flex items-center justify-center overflow-hidden shadow-sm transition-all duration-300 ease-out group-hover:shadow-md">
                            <div className="text-4xl transition-transform duration-500 ease-out group-hover:scale-105">
                                {category.icon}
                            </div>
                        </div>
                        <h3 className="text-heading-sm mt-4 text-stone-900 group-hover:text-sage-700 transition-colors">
                            {category.name}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
