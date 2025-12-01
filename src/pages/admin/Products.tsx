import { useState, useMemo, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import ProductModal from '../../components/admin/ProductModal';
import { supabase } from '../../lib/supabase';
import type { Product, Category } from '../../types/database';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ name: '', category: '', status: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(name)')
            .order('name', { ascending: true });
        
        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data as any[]);
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        const { data, error } = await supabase.from('categories').select('*');
        if (error) console.error('Error fetching categories:', error);
        else setCategories(data);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
            const categoryMatch = filters.category ? product.category_id?.toString() === filters.category : true;
            const statusMatch = filters.status ? product.status === filters.status : true;
            return nameMatch && categoryMatch && statusMatch;
        });
    }, [products, filters]);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            const { error } = await supabase.from('products').delete().match({ id });
            if (error) {
                console.error('Error deleting product:', error);
            } else {
                setProducts(prev => prev.filter(p => p.id !== id));
            }
        }
    };

    const handleSaveModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchProducts(); // Refresh data
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium"
                >
                    <PlusCircle size={20} />
                    Thêm sản phẩm
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={filters.name}
                        onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="sm:w-48">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="sm:w-48">
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang bán</option>
                        <option value="inactive">Ngưng bán</option>
                        <option value="hidden">Ẩn</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Sản phẩm</th>
                                <th className="px-6 py-4">Danh mục</th>
                                <th className="px-6 py-4">Giá bán</th>
                                <th className="px-6 py-4">Giá KM</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4">Bán chạy</th>
                                <th className="px-6 py-4 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        Không tìm thấy sản phẩm nào
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image_url || '/placeholder.jpg'}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                                <span className="font-medium text-gray-800">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{product.categories?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-600">{formatCurrency(product.price)}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {product.discount_price ? formatCurrency(product.discount_price) : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {product.status === 'active' ? 'Đang bán' : 'Ngưng bán'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                product.is_special ? 'bg-orange-100 text-orange-700' : 'bg-transparent'
                                            }`}>
                                                {product.is_special ? 'Có' : ''}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50 transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {isModalOpen && (
                <ProductModal
                    product={editingProduct}
                    categories={categories}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveModal}
                />
            )}
        </div>
    );
}
