import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import CategoryTabs from '../components/CategoryTabs';
import MenuFilters from '../components/MenuFilters';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types/database';

export default function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');
    const [filters, setFilters] = useState({
        sort: 'name',
        order: 'asc',
        priceRange: ''
    });
    const [searchParams] = useSearchParams();

    // Load categories
    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error('Error fetching categories:', error);
            } else {
                setCategories(data);
            }
        };

        fetchCategories();
    }, []);

    // Load products with filtering
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                let query = supabase.from('products').select(`
                    *,
                    categories (
                        name
                    )
                `);

                // Filter by Category
                if (activeCategory) {
                    query = query.eq('category_id', activeCategory);
                }

                // Filter by Search
                const search = searchParams.get('search');
                if (search) {
                    query = query.ilike('name', `%${search}%`);
                }
                
                // Filter by Price Range
                if (filters.priceRange) {
                    const [min, max] = filters.priceRange.split('-').map(Number);
                    if (filters.priceRange === '200000+') {
                        query = query.gte('price', 200000);
                    } else {
                        query = query.gte('price', min).lte('price', max);
                    }
                }
                
                // Sort
                if (filters.sort) {
                    query = query.order(filters.sort, { ascending: filters.order === 'asc' });
                }

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                setProducts(data as any[]);

            } catch (error) {
                console.error('Error loading products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [activeCategory, filters, searchParams, categories]);

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId || '');
    };

    const handleFiltersChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    return (
        <div className="pb-8 bg-[#FFFBF7] min-h-screen">
            {/* Hero Section với ảnh */}
            <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image với parallax effect */}
                <div className="absolute inset-0">
                    <img 
                        src="/images/bg/bg-codao.jpg" 
                        alt="Menu Banner" 
                        className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100"
                    />
                    {/* Gradient Overlay để text dễ đọc */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
                {/* Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-[1200px] mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-lobster mb-6 drop-shadow-2xl animate-fadeInUp">
                            Thực Đơn
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto drop-shadow-lg font-medium leading-relaxed">
                            Khám phá hương vị miền Tây qua từng món ăn được chế biến tâm huyết
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-sm font-semibold">100+ Món ngon</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-green-400">✓</span>
                                <span className="text-sm font-semibold">Nguyên liệu tươi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 mt-12">
                {/* Category Tabs */}
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Filters */}
                <div className="flex justify-end mb-6">
                    <MenuFilters onFiltersChange={handleFiltersChange} />
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg">
                            Không tìm thấy sản phẩm nào trong danh mục này.
                        </p>
                        <button
                            onClick={() => setActiveCategory('')}
                            className="cursor-pointer mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Xem tất cả
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

