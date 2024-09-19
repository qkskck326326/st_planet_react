import React from 'react';
import styles from "../../styles/common/ModalStyle.module.css";

function OutputModal({ show, text, onConfirm, onCancel }) {
  if (!show) return null;  // 모달이 열려 있을 때만 렌더링

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{text}</p>
        <div className={styles.modalButtons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default OutputModal;
