// checkout.js
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '/javascript-amazon-project/data/products.js'; // パスを絶対パスに変更
import { loadCart } from '/javascript-amazon-project/data/cart.js'; // パスを絶対パスに変更

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