document.addEventListener('DOMContentLoaded', function() {
    const paymentMethod = document.getElementById('paymentMethod');
    const paymentDetails = document.querySelectorAll('.payment-details');

    // Function to hide all payment detail sections
    function hideAllPaymentDetails() {
        paymentDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    // Function to show selected payment detail section
    function showPaymentDetails(method) {
        hideAllPaymentDetails();
        const selectedDetail = document.getElementById(`${method}Details`);
        if (selectedDetail) {
            selectedDetail.style.display = 'flex';
        }
    }

    // Add event listener for payment method selection
    paymentMethod.addEventListener('change', function() {
        const selectedMethod = this.value;
        showPaymentDetails(selectedMethod);
    });

    // Form validation
    const withdrawForm = document.getElementById('withdrawForm');
    withdrawForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('amount').value;
        const selectedMethod = paymentMethod.value;
        
        // Basic validation
        if (amount < 10 || amount > 1000) {
            alert('Withdrawal amount must be between $10 and $1000');
            return;
        }

        // Validate payment method specific fields
        let isValid = true;
        switch(selectedMethod) {
            case 'easypaisa':
                const easypaisaNumber = document.getElementById('easypaisaNumber').value;
                if (!/^03\d{9}$/.test(easypaisaNumber)) {
                    alert('Please enter a valid 11-digit EasyPaisa account number');
                    isValid = false;
                }
                break;
            case 'jazzcash':
                const jazzcashNumber = document.getElementById('jazzcashNumber').value;
                if (!/^03\d{9}$/.test(jazzcashNumber)) {
                    alert('Please enter a valid 11-digit JazzCash account number');
                    isValid = false;
                }
                break;
            case 'paypal':
                const paypalEmail = document.getElementById('paypalEmail').value;
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
                    alert('Please enter a valid PayPal email address');
                    isValid = false;
                }
                break;
            case 'bank':
                const bankName = document.getElementById('bankName').value;
                const accountNumber = document.getElementById('accountNumber').value;
                const routingNumber = document.getElementById('routingNumber').value;
                if (!bankName || !accountNumber || !routingNumber) {
                    alert('Please fill in all bank details');
                    isValid = false;
                }
                break;
            case 'crypto':
                const cryptoWallet = document.getElementById('cryptoWallet').value;
                if (!cryptoWallet) {
                    alert('Please enter a valid crypto wallet address');
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Withdrawal request submitted successfully! We will process it within 3-5 business days.');
            withdrawForm.reset();
            hideAllPaymentDetails();
        }
    });

    // Add input validation for mobile numbers
    const mobileInputs = document.querySelectorAll('input[placeholder*="03XX"]');
    mobileInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 11 digits
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
            
            // Format as 03XX-XXXXXXX
            if (this.value.length >= 4) {
                this.value = this.value.slice(0, 4) + '-' + this.value.slice(4);
            }
        });
    });
}); 