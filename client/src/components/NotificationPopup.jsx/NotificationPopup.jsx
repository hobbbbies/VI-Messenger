import { useEffect, useState } from "react";
import styles from './NotificationPopup.module.css'

export default function NotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("updatePopupDismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("updatePopupDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h4 className={styles.title}>📢 Update Notice</h4>
          <p className={styles.message}>
            Try live messaging by opening a second tab in an incognito browser!
          </p>
        </div>
        <button className={styles.close} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
