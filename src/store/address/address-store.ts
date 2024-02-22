import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	address: {
		firstName: string;
		lastName: string;
		address: string;
		address2?: string;
		postalCode: string;
		city: string;
		country: string;
		phone: string;
	};

	setAddress: (address: State["address"]) => void;
	resetAddress: () => void;
}

export const useAddressStore = create<State>()(
	persist(
		(set, get) => ({
			address: {
				firstName: "",
				lastName: "",
				address: "",
				address2: "",
				postalCode: "",
				city: "",
				country: "",
				phone: "",
			},

			setAddress: (address: State["address"]) => {
				set({ address });
			},

			resetAddress: () => {
				set({
					address: {
						firstName: "",
						lastName: "",
						address: "",
						address2: "",
						postalCode: "",
						city: "",
						country: "",
						phone: "",
					},
				});
			},
		}),
		{
			name: "address-storage",
		}
	)
);
