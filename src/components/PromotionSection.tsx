import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PromotionSection() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev; // Timer finished
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-10 md:py-16 bg-[#FFFBF7]">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
                        {/* Content */}
                        <div className="text-white text-center md:text-left max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-white/30"
                            >
                                <Sparkles size={16} className="text-yellow-300" />
                                <span>Ưu đãi giới hạn trong ngày</span>
                            </motion.div>

                            <h2 className="text-3xl md:text-5xl font-lobster mb-4 leading-tight">
                                Combo Gia Đình <br />
                                <span className="text-yellow-300">Giảm Ngay 20%</span>
                            </h2>

                            <p className="text-white/90 text-lg mb-8">
                                Thưởng thức trọn vẹn hương vị miền Tây với Combo Bánh Tằm + Xíu Mại + Bì Thính. Tặng kèm 2 ly trà tắc giải nhiệt!
                            </p>

                            {/* Timer */}
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[70px] border border-white/20">
                                    <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                                    <span className="text-xs uppercase opacity-80">Giờ</span>
                                </div>
                                <span className="text-2xl font-bold">:</span>
                                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[70px] border border-white/20">
                                    <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                    <span className="text-xs uppercase opacity-80">Phút</span>
                                </div>
                                <span className="text-2xl font-bold">:</span>
                                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[70px] border border-white/20">
                                    <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    <span className="text-xs uppercase opacity-80">Giây</span>
                                </div>
                            </div>

                            <Link
                                to="/menu"
                                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-yellow-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Đặt Ngay <ArrowRight size={20} />
                            </Link>
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full md:w-1/2 max-w-md"
                        >
                            <div className="aspect-square relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform scale-90 animate-pulse"></div>
                                <img
                                    src="/images/hero-dish_4.png"
                                    alt="Combo Khuyến Mãi"
                                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                {/* Price Tag */}
                                <div className="absolute -bottom-4 -right-4 md:bottom-10 md:-right-10 bg-yellow-400 text-red-600 font-bold rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl rotate-12 z-20 border-4 border-white">
                                    <span className="text-xs line-through text-gray-600">150k</span>
                                    <span className="text-2xl">120k</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
