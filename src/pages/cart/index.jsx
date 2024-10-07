import { useState } from 'react';
import Cart from '../../components/cart/Cart';
import OrderPayment from '../../components/cart/OrderPayment';

const CartPage = () => {
    const [showOrderPayment, setShowOrderPayment] = useState(false);

    const handleOrderClick = () => {
        setShowOrderPayment(true);
    };

    return (
        <div>
            {!showOrderPayment ? (
                <Cart onOrderClick={handleOrderClick} />
            ) : (
                <OrderPayment />
            )}
        </div>
    );
};

export default CartPage;