const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl shadow-md p-4 flex flex-col h-full border border-gray-100">
            {/* Skeleton for Image */}
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl mb-4 animate-pulse" />

            {/* Skeleton for Text */}
            <div className="w-4/5 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-200 rounded mb-6 animate-pulse" />

            {/* Skeleton for Price and Button */}
            <div className="mt-auto flex justify-between items-end">
                <div className="w-2/5 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
