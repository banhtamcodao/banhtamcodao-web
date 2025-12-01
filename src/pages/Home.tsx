import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SchemaJSONLD from '../components/SchemaJSONLD';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import AnimateOnScroll from '../components/AnimateOnScroll';
import FeaturedSection from '../components/FeaturedSection';
import MenuSection from '../components/MenuSection';
import PromotionSection from '../components/PromotionSection';
import CategoryHighlights from '../components/CategoryHighlights';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types/database';

export default function Home() {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch products from database
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select(`
                        *,
                        categories (
                            name
                        )
                    `)
                    .eq('status', 'active')
                    .order('name', { ascending: true });

                // Fetch categories from database
                const { data: categoriesData, error: categoriesError } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name', { ascending: true });

                if (productsError) {
                    console.error('Error fetching products:', productsError);
                } else {
                    setAllProducts(productsData as any[]);
                }

                if (categoriesError) {
                    console.error('Error fetching categories:', categoriesError);
                } else {
                    setCategories(categoriesData || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            {/* SEO */}
            <SEO
                title="Trang Chủ"
                description="Bánh Tằm Cô Đào - Đặc sản miền Tây thơm ngon, chuẩn vị. Đặt món ngay để thưởng thức hương vị quê hương!"
            />
            <SchemaJSONLD
                data={{
                    "@context": "https://schema.org",
                    "@type": "Restaurant",
                    "name": "Bánh Tằm Cô Đào",
                    "image": "https://banhtamcodao.com/og-image.jpg",
                    "description": "Đặc sản miền Tây thơm ngon, chuẩn vị.",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "123 Đường ABC",
                        "addressLocality": "Quận 1",
                        "addressRegion": "Hồ Chí Minh",
                        "postalCode": "700000",
                        "addressCountry": "VN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 10.7769,
                        "longitude": 106.7009
                    },
                    "url": "https://banhtamcodao.com",
                    "telephone": "+84123456789",
                    "priceRange": "$$",
                    "servesCuisine": "Vietnamese"
                }}
            />

            {/* Hero slider: hiển thị ngay, KHÔNG áp dụng AnimateOnScroll */}
            <HeroSection />

            <AnimateOnScroll>
                <Features />
            </AnimateOnScroll>

            {/* Promotion Section */}
            <AnimateOnScroll>
                <PromotionSection />
            </AnimateOnScroll>

            {/* Category Highlights */}
            <AnimateOnScroll>
                <CategoryHighlights />
            </AnimateOnScroll>

            {/* About Section */}
            <AboutSection />

            {/* Section Món Nổi Bật (Slider) */}
            <FeaturedSection />

            {/* Section Thực Đơn Mới */}
            <section className="relative py-10 md:py-16 bg-[#FFFBF7] overflow-hidden" aria-label="Thực đơn">
                <div className="max-w-[1200px] mx-auto px-4">
                    {allProducts.length > 0 ? (
                        <MenuSection products={allProducts} categoriesList={categories} />
                    ) : (
                        <p className="text-center text-gray-600 py-10">
                            Đang cập nhật thực đơn...
                        </p>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            <AnimateOnScroll>
                <CallToAction />
            </AnimateOnScroll>

        </>
    );
}
