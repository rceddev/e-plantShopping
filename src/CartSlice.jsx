import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If the item already exists, increment the quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1, // Set initial quantity to 1
        });
      }
      console.log("Item added to cart:", action.payload);
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
      console.log("Item removed from cart:", itemName);
      // Optionally, you can also log the updated cart state
      console.log("Updated cart items:", state.items);
      
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
        console.log(`Updated quantity for ${name}:`, quantity);
      } else {
        console.warn(`Item ${name} not found in cart for quantity update.`);
      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
