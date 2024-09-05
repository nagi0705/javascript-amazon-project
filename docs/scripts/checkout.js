// checkout.js
import { renderOrderSummary } from './checkout/orderSummary.js'; // パスの修正
import { renderPaymentSummary } from './checkout/paymentSummary.js'; // パスの修正
import { loadProductsFetch } from '../data/products.js'; // パスの修正
import { loadCart } from '../data/cart.js'; // パスの修正

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