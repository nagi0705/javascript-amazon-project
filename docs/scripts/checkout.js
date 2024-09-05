// checkout.js
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '/javascript-amazon-project/data/products.js';
import { loadCart } from '/javascript-amazon-project/data/cart.js';

async function loadPage() {
    try {
        
        await loadProductsFetch();

        await new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });

        // 注文概要と支払い概要をレンダリング
        renderOrderSummary();
        renderPaymentSummary();

    } catch (error) {
        console.error('Unexpected error. Please try again later.', error);
    }
}

loadPage();