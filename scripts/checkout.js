import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();
    renderPaymentSummary();

    
    document.querySelectorAll('.js-update-link').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            
            console.log(`Update clicked for product ID: ${productId}`);
            
            const newQuantity = prompt('Enter new quantity:');
            if (newQuantity && !isNaN(newQuantity)) {
                
                console.log(`New quantity for product ID ${productId}: ${newQuantity}`);
            }
        });
    });
});