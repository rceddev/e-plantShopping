import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(element => {
      console.log("Element in cart:", element); 
      let cost = element.cost 
      cost = cost.replace(/[^0-9.-]+/g, ''); // Remove currency symbols
      total += element.quantity * parseFloat(cost); // Calculate total cost based on quantity
      console.log(`Cost for ${element.name}:`, cost, "Quantity:", element.quantity, "Total so far:", total); 
    });
    
    return total.toFixed(2); // Return total amount formatted to 2 decimal places
  };



  const handleCheckoutShopping = () => {
    console.log("Checkout process initiated.");
    alert("Checkout process initiated. Please implement your checkout logic.");
    // Implement your checkout logic here
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    

  };

  const handleDecrement = (item) => {
   if(item.quantity - 1 >=0 ) {
     dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); 
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * item.cost.replace(/[^0-9.-]+/g, ''); // Remove currency symbols and calculate total

  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => handleCheckoutShopping()}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


