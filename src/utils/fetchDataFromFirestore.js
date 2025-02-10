import { db } from '../config/firebase.js';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchProducts = async (category) => {
  try {
    const productsRef = collection(db, 'products');
    const q = category 
      ? query(productsRef, where('category', '==', category))
      : productsRef;
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (category, productId) => {
  try {
    const docRef = doc(db, 'products', `${category}-${productId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}; 