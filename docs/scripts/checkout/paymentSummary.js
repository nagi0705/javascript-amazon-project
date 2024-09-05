import { cart } from '/javascript-amazon-project/data/cart.js';
import { getProduct } from '/javascript-amazon-project/data/products.js';
import { getDeliveryOption } from '/javascript-amazon-project/data/deliveryOptions.js';
import { formatCurrency } from '/javascript-amazon-project/scripts/utils/money.js';
import { addOrder } from '/javascript-amazon-project/data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    if (!product) return;
    productPriceCents += product.priceCents * cartItem.quantity;
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (!deliveryOption) return;
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>
      <div class="payment-summary-row">
        <div>Items (${cart.length}):</div>  
        <div class="payment-summary-money">
          ${formatCurrency(productPriceCents)}
        </div>
      </div>
      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          ${formatCurrency(shippingPriceCents)}
        </div>
      </div>
      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          ${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>
      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          ${formatCurrency(taxCents)}
        </div>
      </div>
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          ${formatCurrency(totalCents)}
        </div>
      </div>
      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
    `;
    
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  const placeOrderButton = document.querySelector('.js-place-order');
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }
      window.location.href = 'orders.html';
    });
  }
}