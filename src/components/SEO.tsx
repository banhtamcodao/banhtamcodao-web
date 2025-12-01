import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export default function SEO({
    title,
    description = "Bánh Tằm Cô Đào - Đặc sản miền Tây thơm ngon, chuẩn vị. Đặt món ngay để thưởng thức hương vị quê hương!",
    image = "/og-image.jpg",
    url = "https://banhtamcodao.com",
    type = "website"
}: SEOProps) {
    const siteTitle = `${title} | Bánh Tằm Cô Đào`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph tags (Facebook, Zalo) */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Bánh Tằm Cô Đào" />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
