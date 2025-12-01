interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
}

export default function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
    const style = {
        width,
        height,
    };

    const baseClasses = "animate-pulse bg-gray-200";
    const variantClasses = {
        text: "rounded h-4 w-full",
        circular: "rounded-full",
        rectangular: "rounded-none",
        rounded: "rounded-md",
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    );
}
