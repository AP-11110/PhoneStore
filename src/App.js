import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from "./components/Modal";


function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart); // accessing state values
  const { isOpen } = useSelector((state) => state.modal); 
  const dispatch = useDispatch(); // dispatching actions

  // everytime the cartItems change, cash & cart amounts get updated
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [])

  if(isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>;
}
export default App;
