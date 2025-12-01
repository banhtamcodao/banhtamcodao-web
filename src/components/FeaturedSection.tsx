import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabase';
import type { Product } from '../types/database';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function FeaturedSection() {
    const navigationPrevRef = useRef<HTMLButtonElement>(null);
    const navigationNextRef = useRef<HTMLButtonElement>(null);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            setLoading(true);
            try {
                // First try to get featured products (is_special = true)
                let { data, error } = await supabase
                    .from('products')
                    .select(`
                        *,
                        categories (
                            name
                        )
                    `)
                    .eq('status', 'active')
                    .eq('is_special', true)
                    .order('name', { ascending: true })
                    .limit(8);

                // If no featured products or error, get any active products
                if (error || !data || data.length === 0) {
                    const { data: fallbackData, error: fallbackError } = await supabase
                        .from('products')
                        .select(`
                            *,
                            categories (
                                name
                            )
                        `)
                        .eq('status', 'active')
                        .order('name', { ascending: true })
                        .limit(8);

                    if (fallbackError) {
                        console.error('Error fetching products:', fallbackError);
                        setFeaturedProducts([]);
                    } else {
                        setFeaturedProducts(fallbackData as any[] || []);
                    }
                } else {
                    setFeaturedProducts(data as any[]);
                }
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setFeaturedProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <section className="relative py-10 md:py-16 bg-[#FFFBF7] overflow-hidden" aria-label="Món nổi bật">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <span className="text-base font-semibold uppercase tracking-[0.3em] text-primary/70 sm:text-xl">ĐƯỢC YÊU THÍCH NHẤT</span>
                    <h2 className="text-3xl md:text-4xl font-lobster text-gray-900 mt-2">Món Ngon Phải Thử</h2>
                </div>

                <div className="relative overflow-visible">
                    {/* Navigation Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl md:text-4xl font-lobster text-gray-900">
                            Món nổi bật
                        </h3>
                        <div className="flex gap-3">
                            <button
                                ref={navigationPrevRef}
                                className="cursor-pointer w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                ref={navigationNextRef}
                                className="cursor-pointer w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="max-w-[1200px] mx-auto px-4">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-3xl aspect-square animate-pulse"></div>
                        ))}
                    </div>
                ) : featuredProducts.length > 0 ? (
                    <div className="overflow-visible">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={16}
                            slidesPerView={2}
                            loop={false}
                            watchSlidesProgress={false}
                            autoHeight={false}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                // @ts-ignore
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                // @ts-ignore
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }}
                            breakpoints={{
                                0: { 
                                    slidesPerView: 2, 
                                    spaceBetween: 16,
                                    loop: false,
                                },
                                640: { 
                                    slidesPerView: 2, 
                                    spaceBetween: 16,
                                    loop: false,
                                },
                                768: { 
                                    slidesPerView: 3, 
                                    spaceBetween: 24,
                                    loop: featuredProducts.length > 3,
                                },
                                1024: { 
                                    slidesPerView: 4, 
                                    spaceBetween: 24,
                                    loop: featuredProducts.length > 4,
                                },
                            }}
                            className="featured-section-swiper !py-4 !pb-8"
                        >
                            {featuredProducts.map((product) => (
                                <SwiperSlide key={product.id} className="!h-auto !overflow-visible">
                                    <div className="h-full pb-4">
                                        <ProductCard product={product} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>Chưa có món nổi bật nào.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
