import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Mock data for options (since DB doesn't support it yet)
const MOCK_OPTIONS = [
    { id: 1, name: 'Thêm Bì', price: 5000 },
    { id: 2, name: 'Thêm Chả', price: 5000 },
    { id: 3, name: 'Thêm Xíu Mại', price: 10000 },
    { id: 4, name: 'Thêm Nước Cốt Dừa', price: 0 },
];

// Mock reviews
const MOCK_REVIEWS = [
    { id: 1, user: 'Nguyễn Văn A', rating: 5, comment: 'Bánh tằm rất ngon, nước cốt dừa béo ngậy!', date: '2023-10-25' },
    { id: 2, user: 'Trần Thị B', rating: 4, comment: 'Giao hàng nhanh, đóng gói cẩn thận.', date: '2023-10-20' },
    { id: 3, user: 'Lê Văn C', rating: 5, comment: 'Chuẩn vị miền Tây, sẽ ủng hộ dài dài.', date: '2023-10-15' },
];

export default function ProductDetail() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Fetch product by slug
                const { data, error } = await supabase
                    .from('products')
                    .select(`
                        *,
                        categories (
                            id,
                            name,
                            slug
                        )
                    `)
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setProduct(data);

                // Fetch related products (same category)
                if (data.category_id) {
                    const { data: relatedData } = await supabase
                        .from('products')
                        .select(`
                            *,
                            categories (name)
                        `)
                        .eq('category_id', data.category_id)
                        .neq('id', data.id)
                        .limit(8);

                    setRelatedProducts(relatedData || []);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
            // Reset state when slug changes
            setQuantity(1);
            setSelectedOptions([]);
            setActiveTab('description');
            window.scrollTo(0, 0);
        }
    }, [slug]);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const toggleOption = (optionId: number) => {
        setSelectedOptions(prev =>
            prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Calculate total price with options
        const optionsPrice = selectedOptions.reduce((total, id) => {
            const option = MOCK_OPTIONS.find(opt => opt.id === id);
            return total + (option?.price || 0);
        }, 0);

        const finalPrice = (product.discount_price || product.price) + optionsPrice;

        addToCart({
            id: product.id,
            name: product.name,
            price: finalPrice,
            quantity: quantity,
            image_url: product.image_url,
            options: selectedOptions // Store selected options IDs
        });

        // Show success feedback (could be a toast)
        // For now, maybe just a console log or rely on the cart animation
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF7] text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h2>
                <Link to="/menu" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors">
                    Quay lại thực đơn
                </Link>
            </div>
        );
    }

    const currentPrice = product.discount_price || product.price;
    const discountPercentage = product.discount_price
        ? Math.round(((product.price - product.discount_price) / product.price) * 100)
        : 0;

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20">
            <SEO
                title={product.name}
                description={product.description || `Thưởng thức món ${product.name} thơm ngon tại Bánh Tằm Cô Đào.`}
                image={product.image_url}
            />

            <div className="max-w-[1200px] mx-auto px-4 pt-24 md:pt-32">
                {/* Breadcrumbs */}
                <div className="mb-6">
                    <Breadcrumbs items={[
                        { label: 'Thực đơn', link: '/menu' },
                        { label: product.categories?.name || 'Món ăn', link: '/menu' },
                        { label: product.name }
                    ]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Left Column: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100 relative group">
                            <img
                                src={product.image_url || '/images/placeholder-food.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {discountPercentage > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                                    -{discountPercentage}%
                                </div>
                            )}
                        </div>
                        {/* Thumbnail gallery could go here if we had multiple images */}
                    </div>

                    {/* Right Column: Product Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-lobster text-gray-900 mb-2">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center text-yellow-500 text-sm">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <span className="text-gray-500 ml-2">(12 đánh giá)</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                <ShieldCheck size={16} /> Đảm bảo vệ sinh
                            </span>
                        </div>

                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-3xl font-bold text-[#FF5B24]">
                                {formatCurrency(currentPrice)}
                            </span>
                            {product.discount_price && (
                                <span className="text-lg text-gray-400 line-through mb-1">
                                    {formatCurrency(product.price)}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {product.description || 'Món ăn đặc sản miền Tây với hương vị đậm đà, nguyên liệu tươi ngon được chọn lọc kỹ càng.'}
                        </p>

                        {/* Options Section */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                Món ăn kèm <span className="text-xs font-normal text-gray-500">(Tùy chọn)</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {MOCK_OPTIONS.map(option => (
                                    <label
                                        key={option.id}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedOptions.includes(option.id)
                                            ? 'border-primary bg-orange-50'
                                            : 'border-gray-200 hover:border-orange-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedOptions.includes(option.id) ? 'bg-primary border-primary' : 'border-gray-300'
                                                }`}>
                                                {selectedOptions.includes(option.id) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{option.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {option.price === 0 ? 'Miễn phí' : `+${formatCurrency(option.price)}`}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedOptions.includes(option.id)}
                                            onChange={() => toggleOption(option.id)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-gray-100">
                            {/* Quantity */}
                            <div className="flex items-center bg-white border border-gray-200 rounded-full w-fit">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} />
                                Thêm vào giỏ hàng - {formatCurrency((currentPrice + selectedOptions.reduce((sum, id) => sum + (MOCK_OPTIONS.find(o => o.id === id)?.price || 0), 0)) * quantity)}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Giao hàng</p>
                                    <p className="text-sm font-bold text-gray-800">Trong 30 phút</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Hoạt động</p>
                                    <p className="text-sm font-bold text-gray-800">7:00 - 22:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section: Description & Reviews */}
                <div className="mb-16">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-4 px-6 font-bold text-lg transition-colors relative ${activeTab === 'description'
                                ? 'text-primary'
                                : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            Thông tin chi tiết
                            {activeTab === 'description' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-4 px-6 font-bold text-lg transition-colors relative ${activeTab === 'reviews'
                                ? 'text-primary'
                                : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            Đánh giá (12)
                            {activeTab === 'reviews' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                            )}
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        {activeTab === 'description' ? (
                            <div className="prose max-w-none text-gray-600">
                                <p>
                                    {product.description || 'Món ăn được chế biến từ những nguyên liệu tươi ngon nhất, đảm bảo vệ sinh an toàn thực phẩm. Hương vị truyền thống kết hợp với công thức độc quyền tạo nên sự khác biệt.'}
                                </p>
                                <p className="mt-4">
                                    <strong>Thành phần:</strong> Bột gạo, thịt heo, nước cốt dừa, rau sống, gia vị gia truyền...
                                </p>
                                <p className="mt-4">
                                    <strong>Hướng dẫn sử dụng:</strong> Dùng ngay khi còn nóng để cảm nhận trọn vẹn hương vị.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {MOCK_REVIEWS.map(review => (
                                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{review.user}</h4>
                                                    <div className="flex text-yellow-400 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm ml-12">{review.comment}</p>
                                    </div>
                                ))}
                                <button className="w-full py-3 text-primary font-semibold border border-primary rounded-xl hover:bg-orange-50 transition-colors">
                                    Xem thêm đánh giá
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-lobster text-gray-900 mb-6">Có thể bạn sẽ thích</h2>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={16}
                            slidesPerView={2}
                            navigation
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 24 },
                                1024: { slidesPerView: 4, spaceBetween: 24 },
                            }}
                            className="!pb-10"
                        >
                            {relatedProducts.map(item => (
                                <SwiperSlide key={item.id} className="!h-auto">
                                    <div className="h-full pb-4">
                                        <ProductCard product={item} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
}
