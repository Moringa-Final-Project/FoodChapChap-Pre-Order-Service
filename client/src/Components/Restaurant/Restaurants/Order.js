import React, { useState } from 'react';
import './Order.css'

const OrderHistory = ({ orders }) => {
  const [orderStatus, setOrderStatus] = useState({});

  const handleOrderReady = (orderId) => {
    setOrderStatus((prevStatus) => ({ ...prevStatus, [orderId]: 'ready' }));
  };

  const handleOrderReject = (orderId) => {
    setOrderStatus((prevStatus) => ({ ...prevStatus, [orderId]: 'rejected' }));
  };

  if (!orders || orders.length === 0) {
    return <p>No orders available</p>;
  }

  return (
    <div className="order-history">
      <h2>Order list</h2>
      <div className="order-cards">
        {orders.map((order, index) => (
          <div key={order.id} className="order-card">
            <img src={order.imageUrl} alt={order.item} className="order-item-image" />
            <h3>{order.item}</h3>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price}</p>
            <div className="order-card-buttons">
              {!orderStatus[order.id] && (
                <>
                  <button
                    className="reject-button"
                    onClick={() => handleOrderReject(order.id)}
                  >
                    Reject
                  </button>
                  <button
                    className="ready-button"
                    onClick={() => handleOrderReady(order.id)}
                  >
                    Ready
                  </button>
                </>
              )}
              {orderStatus[order.id] === 'ready' && (
                <p className="order-status-message">Your order is ready</p>
              )}
              {orderStatus[order.id] === 'rejected' && (
                <p className="order-status-message">Your order was rejected</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
