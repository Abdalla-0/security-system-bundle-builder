"use client";

import { initialCart } from "@/data/initial-cart";
import { TCartState, TProductData } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const CART_STORAGE_KEY = "wyze-cart";
interface CartContextType {
  cart: TCartState;
  activeStep: number;
  setActiveStep: (step: number) => void;
  updateCart: (
    productId: string,
    variantId: string | null,
    newQuantity: number,
    productData?: TProductData,
  ) => void;
  updateItemQuantity: (cartKey: string, newQty: number) => void;
  saveCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<TCartState>(initialCart as TCartState);

  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch {
          return initialCart as TCartState;
        }
      }
    };
    loadCart();
  }, []);

  const updateCart = (
    productId: string,
    variantId: string | null,
    newQuantity: number,
    productData?: TProductData,
  ) => {
    const cartKey = variantId ? `${productId}-${variantId}` : productId;

    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      // if quantity is 0, remove from cart
      if (newQuantity <= 0) {
        delete updatedCart[cartKey];
      } else if (updatedCart[cartKey]) {
        // if product already in cart
        updatedCart[cartKey] = {
          ...updatedCart[cartKey],
          quantity: newQuantity,
        };
      } else if (productData) {
        // if new product entering the cart
        updatedCart[cartKey] = {
          id: productId,
          variantId,
          title: productData.title,
          titleAccent: productData.titleAccent || null,
          color: productData.colorName || null,
          quantity: newQuantity,
          price: productData.price,
          compareAtPrice: productData.compareAtPrice,
          billing: productData.billing ?? "",
          image: productData.image,
          adjustable: productData.adjustable ?? true,
          category: productData.category,
        };
      }

      return updatedCart;
    });
  };

  const updateItemQuantity = (cartKey: string, newQty: number) => {
    const item = cart[cartKey];
    if (!item) return;

    updateCart(item.id, item.variantId, newQty, {
      title: item.title,
      price: item.price,
      compareAtPrice: item.compareAtPrice,
      billing: item.billing,
      image: item.image,
      adjustable: item.adjustable,
      category: item.category,
      titleAccent: item.titleAccent ?? undefined,
      colorName: item.color ?? undefined,
    });
  };

  const saveCart = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        activeStep,
        setActiveStep,
        updateCart,
        updateItemQuantity,
        saveCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
