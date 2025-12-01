import { useState, useEffect, useRef } from 'react';
import { Phone, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactLinkProps {
    href: string;
    title: string;
    iconUrl: string;
}

const ContactLink = ({ href, title, iconUrl }: ContactLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end"
    >
        <span className="mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {title}
        </span>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 bg-white shadow-md overflow-hidden border border-gray-100">
            <img src={iconUrl} alt={title} className="w-full h-full object-cover" />
        </div>
    </a>
);

export default function FloatingControls() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const phoneNumber = '0933960788';
    const zaloLink = `https://zalo.me/${phoneNumber}`;
    const facebookLink = 'https://m.me/your-facebook-page-id';

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div ref={menuRef} className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3 pointer-events-none">
            {/* Contact Menu Items */}
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <ContactLink
                    href={`tel:${phoneNumber}`}
                    title={`Gọi ${phoneNumber}`}
                    iconUrl="https://res.cloudinary.com/dgoe8cra8/image/upload/v1759501779/o5g1pgu0iubuc6urku7h.png"
                />
                <ContactLink
                    href={facebookLink}
                    title="Chat Messenger"
                    iconUrl="https://res.cloudinary.com/dz2rvqcve/image/upload/v1758874862/icons8-messenger-500_k7lerf.png"
                />
                <ContactLink
                    href={zaloLink}
                    title="Chat Zalo"
                    iconUrl="https://res.cloudinary.com/dz2rvqcve/image/upload/v1758874837/icons8-zalo-480_y1f57c.png"
                />
            </div>

            {/* Toggle Contact Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto cursor-pointer bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 z-50"
            >
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-90' : 'rotate-0'}`}>
                    {isOpen ? <X size={24} /> : <Phone size={24} />}
                </div>
            </button>

            {/* Back To Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="pointer-events-auto cursor-pointer bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 z-40"
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
