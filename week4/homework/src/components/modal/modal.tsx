import * as styles from './modal.css';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal= ({ isOpen, onClose, onConfirm }: ConfirmationModalProps) => {
    if (!isOpen) return null;
   
    return (
        <div className={styles.modalBack} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                
                <h3 className={styles.title}>정말 탈퇴하시겠어요?</h3>
                <p className={styles.message}>탈퇴 후에는 모든 정보가 삭제돼요</p>
                
                <div className={styles.buttonGroup}>

                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button 
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;