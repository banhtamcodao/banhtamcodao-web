import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../types/database';

interface ProductModalProps {
    product: Product | null;
    categories: Category[];
    onClose: () => void;
    onSave: () => void;
}

const initialProductState: Partial<Product> = {
    name: '', slug: '', description: '', image_url: '', price: 0,
    discount_price: 0, category_id: undefined, status: 'active', is_special: false
};

const slugify = (str: string) => {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[đĐ]/g, 'd');
    str = str.replace(/[^a-z0-9\s-]/g, '');
    str = str.replace(/[\s_-]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
};

export default function ProductModal({ product: productToEdit, categories, onClose, onSave }: ProductModalProps) {
    const [product, setProduct] = useState<Partial<Product>>(initialProductState);
    const [imagePreview, setImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = Boolean(productToEdit);

    useEffect(() => {
        if (productToEdit) {
            setProduct({
                ...productToEdit,
                price: productToEdit.price ?? 0,
                discount_price: productToEdit.discount_price ?? 0,
            });
            if (productToEdit.image_url) {
                setImagePreview(productToEdit.image_url);
            }
        } else {
            setProduct(initialProductState);
            setImagePreview('');
        }
    }, [productToEdit]);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        const val = type === 'checkbox' ? checked : value;

        setProduct((prev: any) => {
            const newState = { ...prev, [name]: val };
            if (name === 'name') {
                newState.slug = slugify(val);
            }
            return newState;
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setImagePreview(URL.createObjectURL(file));

        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from('product-uploads') // Tên bucket của bạn
            .upload(fileName, file);

        if (error) {
            console.error('Error uploading image:', error);
            // Handle error (e.g., show a toast notification)
        } else {
            const { data: { publicUrl } } = supabase.storage.from('product-uploads').getPublicUrl(data.path);
            setProduct(prev => ({ ...prev, image_url: publicUrl }));
        }

        setIsUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const productData = {
            ...product,
            price: Number(product.price) || 0,
            discount_price: Number(product.discount_price) || 0,
            category_id: product.category_id ? Number(product.category_id) : null,
        };

        let error;
        if (isEditMode) {
            // Update
            const { error: updateError } = await supabase
                .from('products')
                .update(productData)
                .match({ id: productToEdit.id });
            error = updateError;
        } else {
            // Insert
            const { error: insertError } = await supabase
                .from('products')
                .insert([productData]);
            error = insertError;
        }

        if (error) {
            console.error('Error saving product:', error);
            // Handle error
        } else {
            onSave();
        }

        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-bold text-gray-900">
                        {isEditMode ? `Chỉnh Sửa: ${productToEdit.name}` : 'Thêm Sản Phẩm Mới'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Column */}
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên Món</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={product.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 focus:outline-none"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Tự động tạo từ tên sản phẩm</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô Tả</label>
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng Thái</label>
                                    <select
                                        name="status"
                                        value={product.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                    >
                                        <option value="active">Đang bán</option>
                                        <option value="inactive">Ngưng bán</option>
                                        <option value="hidden">Ẩn</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={product.category_id || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                                    >
                                        <option value="">-- Chọn danh mục --</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá Bán</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá Khuyến Mãi</label>
                                    <input
                                        type="number"
                                        name="discount_price"
                                        value={product.discount_price}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">HÌNH ẢNH SẢN PHẨM</h3>
                            {imagePreview && (
                                <div className="mb-4 relative w-24 h-24 mx-auto">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg shadow-sm"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col items-center gap-3">
                                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
                                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                                    {isUploading ? 'Đang tải...' : 'Tải ảnh lên'}
                                    <input type="file" hidden onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
                                </label>
                                <span className="text-xs text-gray-400">hoặc</span>
                                <input
                                    type="text"
                                    name="image_url"
                                    placeholder="Dán URL ảnh vào đây"
                                    value={product.image_url}
                                    onChange={handleInputChange}
                                    className="w-full max-w-md px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center"
                                />
                            </div>
                        </div>

                        {/* Special Toggle */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_special"
                                    checked={product.is_special || false}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Món bán chạy / Nổi bật trên trang chủ</span>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 sticky bottom-0 bg-white z-10">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isUploading}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                        {isSubmitting ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
                    </button>
                </div>
            </div>
        </div>
    );
}
