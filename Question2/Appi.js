const BASE_URL = 'http://20.244.56.144/test';

export async function getProductById(productId) {
  const url = `${BASE_URL}/products/${productId}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
