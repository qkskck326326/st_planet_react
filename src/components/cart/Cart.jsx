import { useState } from 'react';
import styles from "../../styles/cart.module.css";

const Cart = ({ onOrderClick }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "[B13] 제노 1500 제트필 사프 2025 수능 플래너샤프",
            price: 900,
            quantity: 1,
            image: "/images/item1.jpg",
            shippingFee: 2500,
        },
        {
            id: 2,
            name: "[D53] 1천원짜리 30장 30매 쿠폰",
            price: 2000,
            quantity: 1,
            image: "/images/item2.jpg",
            shippingFee: 2500,
        }
    ]);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const calculateShipping = () => {
        let totalShipping = 0;
        cartItems.forEach(item => {
            totalShipping += item.shippingFee;
        });
        return totalShipping;
    };

    return (
        <div className={styles.container}>
            <h1>ORDER BASKET</h1>
            <div className={styles.stepIndicator}>
                <div className={styles.stepActive}>01 장바구니</div>
                <div className={styles.step}>02 주문/결제</div>
                <div className={styles.step}>03 주문완료</div>
            </div>

            <div className={styles.cartItems}>
                {cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <input type="checkbox" />
                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                            <h4>{item.name}</h4>
                            <p>₩{item.price.toLocaleString()}</p>
                        </div>
                        <div className={styles.itemQuantity}>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            />
                        </div>
                        <div className={styles.itemPrice}>
                            ₩{(item.price * item.quantity).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <p>상품금액</p>
                    <p>₩{calculateTotal().toLocaleString()}</p>
                </div>
                <div className={styles.summaryItem}>
                    <p>배송비</p>
                    <p>₩{calculateShipping().toLocaleString()}</p>
                </div>
                <div className={styles.summaryItem}>
                    <p>결제예정금액</p>
                    <p className={styles.totalPrice}>₩{(calculateTotal() + calculateShipping()).toLocaleString()}</p>
                </div>
            </div>

            <div className={styles.actionButtons}>
                <button className={styles.continueShopping}>쇼핑계속하기</button>
                <button className={styles.orderAll} onClick={onOrderClick}>전체상품주문</button>
            </div>
        </div>
    );
};

export default Cart;