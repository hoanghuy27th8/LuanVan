import React, { useState, useEffect } from "react";
import './ButtonBackToTop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Sử dụng sự kiện cuộn để xác định khi nào hiển thị nút
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      // Kiểm tra vị trí cuộn để quyết định khi nào hiển thị nút
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <div>
        {isVisible && (
          <button className="back-to-top-button" onClick={scrollToTop}>
            <FontAwesomeIcon className="backToTop-icon" icon={faCircleArrowUp} />
          </button>
        )}
      </div>
    );
  }
  
  export default BackToTopButton;