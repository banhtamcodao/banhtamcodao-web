import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingControls from '../components/FloatingControls';
import StickyMobileCart from '../components/StickyMobileCart';
import FooterNav from '../components/FooterNav';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />

            <FloatingControls />
            <StickyMobileCart />
            <FooterNav />
        </div>
    );
};

export default MainLayout;
