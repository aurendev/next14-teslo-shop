import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	cart: CartProduct[];

	totalProducts: () => number;

	orderSummary: () => {
		total: number;
		subTotal: number;
		tax: number;
		totalProducts: number;
	};

	addProductToCart: (product: CartProduct) => void;

	updateProductQuantity: (product: CartProduct, val: number) => void;

	removeProduct: (product: CartProduct) => void;

	clearCart: () => void;
}

export const useCartStore = create<State>()(
	//Salvar automaticamente en el localstorage
	persist(
		(set, get) => ({
			cart: [],

			totalProducts: () => {
				const { cart } = get();

				return cart.reduce((total, item) => total + item.quantity, 0);
			},

			orderSummary: () => {
				const { cart, totalProducts } = get();

				const subTotal = cart.reduce(
					(sub, item) => item.price * item.quantity + sub,
					0
				);

				const tax = subTotal * 0.15;

				const total = subTotal + tax;

				return { total, subTotal, tax, totalProducts: totalProducts() };
			},

			addProductToCart: (product: CartProduct) => {
				const { cart } = get();

				console.log({ cart });

				const productInCart = cart.some(
					(item) => item.id === product.id && item.size === product.size
				);

				if (!productInCart) {
					set({
						cart: [...cart, product],
					});

					return;
				}

				// El producto Existe.
				const updatedCartProducts = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return { ...item, quantity: item.quantity + product.quantity };
					}

					return item;
				});

				set({ cart: updatedCartProducts });
			},

			updateProductQuantity: (product: CartProduct, val: number) => {
				const { cart } = get();

				const productsUpdated = cart.map((p) => {
					if (p.slug === product.slug && p.size === product.size) {
						p.quantity += val;
					}

					return p;
				});

				set({ cart: productsUpdated });
			},

			removeProduct: (product: CartProduct) => {
				const { cart } = get();

				const productsUpdated = cart.filter(
					(pro) => pro.slug !== product.slug || pro.size !== product.size
				);

				set({ cart: productsUpdated });
			},

			clearCart: () => {
				set({ cart: [] });
			},
		}),
		{
			name: "shopping-cart",
		}
	)
);
