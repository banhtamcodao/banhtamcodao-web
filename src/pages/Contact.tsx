import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import Header from '../components/Header';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: 'url("/images/bg/beach.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <div className="flex-grow pb-10">
                    {/* Hero Section - Compact */}
                    <div className="relative h-[150px] flex flex-col items-center justify-center text-white text-center px-4 mt-4">
                        <h1 className="text-4xl md:text-5xl font-medium animate-fadeInUp drop-shadow-lg font-lobster">Liên Hệ Với Chúng Tôi</h1>
                    </div>

                    <div className="max-w-[1200px] mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Contact Info Cards - Compact & Vibrant Icons */}
                            <div className="lg:col-span-1 space-y-4">
                                {/* Address Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 animate-fadeInUp animation-delay-300 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F30] to-[#FF8F50] rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Địa Chỉ</h3>
                                        <p className="text-gray-700 text-sm font-medium">123 Đường ABC, Quận XYZ</p>
                                        <p className="text-gray-700 text-sm font-medium">TP. Hồ Chí Minh, Việt Nam</p>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 animate-fadeInUp animation-delay-400 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F30] to-[#FF8F50] rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Điện Thoại</h3>
                                        <p className="text-gray-700 text-sm font-medium">+84 123 456 789</p>
                                        <p className="text-gray-700 text-sm font-medium">Hotline: 1900 1234</p>
                                    </div>
                                </div>

                                {/* Email Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 animate-fadeInUp animation-delay-500 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F30] to-[#FF8F50] rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Email</h3>
                                        <p className="text-gray-700 text-sm font-medium">contact@example.com</p>
                                        <p className="text-gray-700 text-sm font-medium">support@example.com</p>
                                    </div>
                                </div>
                                {/* Opening Hours Card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 animate-fadeInUp animation-delay-600 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F30] to-[#FF8F50] rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">Giờ Mở Cửa</h3>
                                        <p className="text-gray-700 text-sm font-medium">Thứ 2 - Thứ 6: 8:00 - 22:00</p>
                                        <p className="text-gray-700 text-sm font-medium">Thứ 7 - CN: 9:00 - 23:00</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form & Map */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Contact Form - Compact */}
                                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 animate-fadeInUp animation-delay-500">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <div className="p-2 bg-orange-100 rounded-lg text-[#FF6F30]">
                                            <Send size={20} />
                                        </div>
                                        Gửi Tin Nhắn
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label htmlFor="name" className="text-xs font-bold text-gray-600 uppercase tracking-wide">Họ và Tên</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#FF6F30] focus:ring-2 focus:ring-[#FF6F30]/20 outline-none transition-all duration-200 text-sm"
                                                    placeholder="Nhập họ tên"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#FF6F30] focus:ring-2 focus:ring-[#FF6F30]/20 outline-none transition-all duration-200 text-sm"
                                                    placeholder="Nhập email"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="subject" className="text-xs font-bold text-gray-600 uppercase tracking-wide">Tiêu Đề</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#FF6F30] focus:ring-2 focus:ring-[#FF6F30]/20 outline-none transition-all duration-200 text-sm"
                                                placeholder="Tiêu đề tin nhắn"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="message" className="text-xs font-bold text-gray-600 uppercase tracking-wide">Nội Dung</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#FF6F30] focus:ring-2 focus:ring-[#FF6F30]/20 outline-none transition-all duration-200 resize-none text-sm"
                                                placeholder="Nhập nội dung..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[#FF6F30] to-[#FF8F50] hover:from-[#e55a20] hover:to-[#e57a40] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                        >
                                            <Send size={18} />
                                            Gửi Tin Nhắn
                                        </button>
                                    </form>
                                </div>

                                {/* Map Section - Compact */}
                                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-2 shadow-xl border border-white/50 h-[300px] overflow-hidden animate-fadeInUp animation-delay-700">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424246568316!2d106.69834831533417!3d10.77978549231919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x1787491df6ed8bc8!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1625631234567!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, borderRadius: '1.5rem' }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Google Map"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
