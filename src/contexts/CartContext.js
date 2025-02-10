import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteField,
  serverTimestamp 
} from 'firebase/firestore';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load cart from Firestore when user changes
  useEffect(() => {
    async function loadCart() {
      if (currentUser) {
        try {
          const cartRef = doc(db, 'carts', currentUser.uid);
          const cartDoc = await getDoc(cartRef);
          
          if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            const items = Object.values(cartData.items || {});
            setCartItems(items);
          } else {
            // Initialize empty cart for new users
            await setDoc(cartRef, {
              userId: currentUser.uid,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              items: {}
            });
            setCartItems([]);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        setCartItems([]);
      }
      setLoading(false);
    }

    loadCart();
  }, [currentUser]);

  // Add item to cart
  async function addToCart(product) {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      const existingItem = cartItems.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity if item exists
        await updateDoc(cartRef, {
          [`items.${product.id}`]: {
            ...product,
            quantity: existingItem.quantity + 1,
            updatedAt: serverTimestamp()
          }
        });
      } else {
        // Add new item
        await updateDoc(cartRef, {
          [`items.${product.id}`]: {
            ...product,
            quantity: 1,
            addedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }
        });
      }

      // Update local state
      const cartDoc = await getDoc(cartRef);
      const items = Object.values(cartDoc.data().items);
      setCartItems(items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // Update item quantity
  async function updateQuantity(productId, newQuantity) {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      if (newQuantity > 0) {
        await updateDoc(cartRef, {
          [`items.${productId}.quantity`]: parseInt(newQuantity),
          [`items.${productId}.updatedAt`]: serverTimestamp()
        });
      } else {
        // Remove item if quantity is 0
        await updateDoc(cartRef, {
          [`items.${productId}`]: deleteField()
        });
      }

      // Update local state
      const cartDoc = await getDoc(cartRef);
      const items = Object.values(cartDoc.data().items || {});
      setCartItems(items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  // Remove item from cart
  async function removeFromCart(productId) {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      await updateDoc(cartRef, {
        [`items.${productId}`]: deleteField()
      });

      // Update local state
      const cartDoc = await getDoc(cartRef);
      const items = Object.values(cartDoc.data().items || {});
      setCartItems(items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  // Clear cart
  async function clearCart() {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      await updateDoc(cartRef, {
        items: {},
        updatedAt: serverTimestamp()
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  // Calculate cart totals
  function getCartTotal() {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = totalPrice * 0.12; // 12% tax
    const total = totalPrice + tax;

    return {
      itemCount,
      totalPrice,
      tax,
      total
    };
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
} 