import { useState } from 'react';
import { useRouter } from 'next/router'; // 페이지 이동을 위한 useRouter import
import styles from '../../styles/admin/adminPage.module.css';

// 각 컴포넌트 import
import CustomerManagement from '../../components/admin/customerManagement/CustomerManagement';
import InventoryManagement from '../../components/admin/inventoryManagement/InventoryManagement';
import PurchaseManagement from '../../components/admin/purchaseManagement/PurchaseManagement';
import ReturnManagement from '../../components/admin/returnManagement/ReturnManagement';
import SalesManagement from '../../components/admin/salesManagement/SalesManagement';
import SalesRank from '../../components/admin/salesRank/SalesRank';

const Index = () => {
    const [selectedMenu, setSelectedMenu] = useState(1);
    const router = useRouter(); // useRouter 사용

    const menuItems = [
        { id: 1, label: '고객관리' },
        { id: 2, label: '매출관리' },
        { id: 3, label: '판매량 순위' },
        { id: 4, label: '상품 재고관리' },
        { id: 5, label: '구매목록' },
        { id: 6, label: '반품목록' },
    ];

    // 메뉴 클릭 핸들러
    const handleMenuClick = (id) => {
        setSelectedMenu(id);
    };

    // 메인페이지로 이동 핸들러
    const goToMainPage = () => {
        router.push('/'); // 메인페이지로 이동 (index.js)
    };

    return (
        <div className={styles.container}>
            {/* 사이드 메뉴 */}
            <div className={styles.sidebar}>
                <h2>관리자 페이지</h2>
                {/* 메인페이지로 이동 버튼 */}
                <button className={styles.mainPageButton} onClick={goToMainPage}>
                    메인페이지로 이동
                </button>

                {/* 메뉴 목록 */}
                <ul className={styles.menuList}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`${styles.menuItem} ${selectedMenu === item.id ? styles.menuItemActive : ''}`}
                            onClick={() => handleMenuClick(item.id)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 선택한 메뉴에 따른 컴포넌트 렌더링 */}
            <div className={styles.content}>
                {selectedMenu === 1 && <CustomerManagement />}
                {selectedMenu === 2 && <SalesManagement />}
                {selectedMenu === 3 && <SalesRank />}
                {selectedMenu === 4 && <InventoryManagement />}
                {selectedMenu === 5 && <PurchaseManagement />}
                {selectedMenu === 6 && <ReturnManagement />}
            </div>
        </div>
    );
};

export default Index;