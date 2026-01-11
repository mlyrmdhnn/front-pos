import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    totalPrice: 0,
  }),

  actions: {
    setPrice(newPrice: number) {
      this.totalPrice = newPrice;
    },
  },
});
