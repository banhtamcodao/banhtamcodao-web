import { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';

interface ContactLinkProps {
    href: string;
    title: string;
    children: React.ReactNode;
}

const ContactLink = ({ href, title, children }: ContactLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end"
    >
        <span className="mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {title}
        </span>
        <div className="w-12 h-12 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 bg-white shadow-md overflow-hidden">
            {children}
        </div>
    </a>
);

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const phoneNumber = '0933960788';
    const zaloLink = `https://zalo.me/${phoneNumber}`;
    const facebookLink = 'https://m.me/your-facebook-page-id'; // Replace with actual ID if known

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className="fixed bottom-32 right-4 z-50 flex flex-col items-end pointer-events-none">
            <div
                className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                {/* Phone Button */}
                <ContactLink href={`tel:${phoneNumber}`} title={`Gọi ${phoneNumber}`}>
                    <img
                        src="https://res.cloudinary.com/dgoe8cra8/image/upload/v1759501779/o5g1pgu0iubuc6urku7h.png"
                        alt="Call"
                        className="w-10 h-10 object-cover"
                    />
                </ContactLink>

                {/* Messenger Button */}
                <ContactLink href={facebookLink} title="Chat Messenger">
                    <img
                        src="https://res.cloudinary.com/dz2rvqcve/image/upload/v1758874862/icons8-messenger-500_k7lerf.png"
                        alt="Messenger"
                        className="w-12 h-12 object-cover"
                    />
                </ContactLink>

                {/* Zalo Button */}
                <ContactLink href={zaloLink} title="Chat Zalo">
                    <img
                        src="https://res.cloudinary.com/dz2rvqcve/image/upload/v1758874837/icons8-zalo-480_y1f57c.png"
                        alt="Zalo"
                        className="w-12 h-12 object-cover"
                    />
                </ContactLink>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-slow pointer-events-auto z-50"
            >
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-75' : 'rotate-0'}`}>
                    {isOpen ? <X size={32} /> : <Phone size={28} />}
                </div>
            </button>
        </div>
    );
}
