import React, { useEffect } from "react";

const ActivationPage = () => {
    useEffect(() => {
        const countdown = 10;
        const timerElement = document.getElementById("timer");
    
        const updateTimer = () => {
          timerElement.textContent = countdown;
          countdown--;
    
          if (countdown < 0) {
            clearInterval(timer);
            window.location.href = "http://localhost:3000/login";
          }
        };
    
        const timer = setInterval(updateTimer, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, []);
    
      return (
        <div style={{ width: '100%', height: '100%', margin: 0, padding: '32px', fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f1f1f1', WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%' }}>
          <div style={{ paddingBottom: '0px', textAlign: 'center', fontWeight: 'normal' }}>
            <a href target="_blank">
              <img style={{ width: '60px', border: 'none' }} src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-judge-auction-flatarticons-blue-flatarticons-1.png" alt="Logo" />
            </a>
            <span style={{ display: 'inline-block', borderLeft: '5px solid #ABC', height: '60px', paddingLeft: '12px', marginLeft: '12px' }}>
              <strong style={{ display: 'block', backgroundColor: 'blue', color: 'white', padding: '8px 12px', borderRadius: '4px' }}>Scalable OJ</strong>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div style={{ backgroundColor: '#CBF1F5', borderRadius: '10px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Success! Account verified.</div>
              <div style={{ display: 'inline-block', width: '40px', height: '40px', backgroundColor: 'green', borderRadius: '50%', color: 'white', fontSize: '24px', lineHeight: '40px', marginBottom: '20px' }}>&#10004;</div>
              <p>Redirecting in</p>
              <div id="timer" style={{ fontSize: '18px', fontWeight: 'bold' }}>10</div>
            </div>
          </div>
        </div>
      );
}

export default ActivationPage;