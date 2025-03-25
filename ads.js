document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let totalEarnings = parseFloat(localStorage.getItem('totalEarnings')) || 0;
    let totalAdsViewed = parseInt(localStorage.getItem('totalAdsViewed')) || 0;
    const viewTime = 30; // seconds
    const earningsPerAd = 1.00; // dollars

    // Get DOM elements
    const totalEarningsElement = document.getElementById('totalEarnings');
    const adsViewedElement = document.getElementById('totalAdsViewed');
    const claimButtons = document.querySelectorAll('.claim-button');
    const timers = document.querySelectorAll('.timer');

    // Initialize timers and buttons
    timers.forEach(timer => {
        timer.textContent = viewTime;
    });

    claimButtons.forEach(button => {
        button.disabled = true;
    });

    // Function to update earnings display
    function updateDisplay() {
        totalEarningsElement.textContent = totalEarnings.toFixed(2);
        adsViewedElement.textContent = totalAdsViewed;
    }

    // Function to start timer for an ad
    function startTimer(timerElement, claimButton) {
        let timeLeft = viewTime;
        let countdown;
        
        // Create and add start button if it doesn't exist
        if (!timerElement.parentElement.querySelector('.start-button')) {
            const startButton = document.createElement('button');
            startButton.className = 'start-button';
            startButton.textContent = 'Start Viewing';
            startButton.style.cssText = `
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                margin-bottom: 1rem;
                font-weight: 600;
                font-size: 1rem;
                width: 100%;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            `;
            
            // Hover effect
            startButton.addEventListener('mouseover', () => {
                startButton.style.transform = 'translateY(-2px)';
                startButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            
            startButton.addEventListener('mouseout', () => {
                startButton.style.transform = 'translateY(0)';
                startButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            });
            
            startButton.addEventListener('click', () => {
                if (!countdown) {
                    startButton.disabled = true;
                    startButton.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
                    startButton.style.cursor = 'not-allowed';
                    startButton.style.transform = 'none';
                    startButton.style.boxShadow = 'none';
                    startButton.textContent = 'Viewing...';
                    
                    // Add progress bar
                    const progressBar = document.createElement('div');
                    progressBar.style.cssText = `
                        width: 100%;
                        height: 4px;
                        background: #ecf0f1;
                        border-radius: 2px;
                        margin-top: 0.5rem;
                        overflow: hidden;
                    `;
                    
                    const progress = document.createElement('div');
                    progress.style.cssText = `
                        width: 100%;
                        height: 100%;
                        background: #3498db;
                        transition: width 1s linear;
                    `;
                    
                    progressBar.appendChild(progress);
                    startButton.parentElement.insertBefore(progressBar, timerElement);
                    
                    countdown = setInterval(() => {
                        timeLeft--;
                        timerElement.textContent = timeLeft;
                        progress.style.width = `${(timeLeft / viewTime) * 100}%`;
                        
                        if (timeLeft <= 0) {
                            clearInterval(countdown);
                            claimButton.disabled = false;
                            claimButton.textContent = 'Claim $1.00';
                            startButton.textContent = 'Completed';
                            startButton.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                            progress.style.background = '#2ecc71';
                        }
                    }, 1000);
                }
            });
            
            timerElement.parentElement.insertBefore(startButton, timerElement);
        }
    }

    // Initialize timers for all ads
    timers.forEach((timer, index) => {
        startTimer(timer, claimButtons[index]);
    });

    // Handle claim button clicks
    claimButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                // Add earnings
                totalEarnings += earningsPerAd;
                totalAdsViewed++;
                
                // Save to localStorage
                localStorage.setItem('totalEarnings', totalEarnings);
                localStorage.setItem('totalAdsViewed', totalAdsViewed);
                
                // Update display
                updateDisplay();
                
                // Disable button and show success message
                this.disabled = true;
                this.textContent = 'Claimed!';
                
                // Show success notification
                showNotification('Successfully earned $1.00!');
                
                // Reset timer and start button
                const timerElement = this.parentElement.querySelector('.timer');
                const startButton = this.parentElement.querySelector('.start-button');
                const progressBar = this.parentElement.querySelector('div[style*="background: #ecf0f1"]');
                
                timerElement.textContent = viewTime;
                startButton.disabled = false;
                startButton.textContent = 'Start Viewing';
                startButton.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                startButton.style.cursor = 'pointer';
                startButton.style.transform = 'none';
                startButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
                
                if (progressBar) {
                    progressBar.remove();
                }
            }
        });
    });

    // Function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
            letter-spacing: 0.5px;
        `;
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Initialize everything when the page loads
    updateDisplay();
}); 