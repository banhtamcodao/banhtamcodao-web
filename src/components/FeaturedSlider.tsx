import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';
import 'swiper/css';
import 'swiper/css/navigation';

interface FeaturedSliderProps {
    products: any[];
}

export default function FeaturedSlider({ products }: FeaturedSliderProps) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <AnimateOnScroll>
            <div className="relative">
                {/* Tiêu đề và Nút điều hướng */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-lobster text-secondary">
                        Món nổi bật
                    </h2>
                    <div className="flex gap-3">
                        <button
                            ref={navigationPrevRef}
                            className="w-11 h-11 rounded-full bg-primary text-light flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <button
                            ref={navigationNextRef}
                            className="w-11 h-11 rounded-full bg-primary text-light flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50"
                        >
                            <ArrowRight size={22} />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={4}
                    loop={true}
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
                        // @ts-ignore
                        swiper.navigation.update();
                    }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 12 },
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                        1200: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    className="!py-16"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </AnimateOnScroll>
    );
}
