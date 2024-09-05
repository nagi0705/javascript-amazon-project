import { renderOrderSummary } from '../scripts/checkout/orderSummary.js';
import { renderPaymentSummary } from '../scripts/checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// ページの読み込み処理
async function loadPage() {
    try {
        // 商品データを非同期に読み込む
        await loadProductsFetch();

        // カートデータを非同期に読み込む
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