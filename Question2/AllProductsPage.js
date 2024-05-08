import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import FilterOptions from '../components/FilterOptions';
import { getProducts } from '../api';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <FilterOptions />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default AllProductsPage;
