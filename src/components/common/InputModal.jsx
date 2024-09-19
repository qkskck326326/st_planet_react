import React from 'react';
import styles from "../../styles/common/ModalStyle.module.css";

function InputModal({ show, text, inputValue, setInputValue, onConfirm, onCancel }) {
  if (!show) return null;  // 모달이 열려 있을 때만 렌더링

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.modalOverlay}> {/* CSS Modules 사용 */}
      <div className={styles.modalContent}>
        <p>{text}</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.inputText}  // CSS Modules 클래스 사용
        />
        <div className={styles.modalButtons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
