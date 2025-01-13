import { useContext } from 'react';
import { deleteOrder, fetchOrder } from '../../services/OrderLine/order/api';
import { updateCartStatus } from '../../services/OrderLine/status/api';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

function SingleOrder({
    order,
    restaurantMap,
    myReservations,
    myOrders,
    setMyOrders,
}) {
    const { updateCart, orderId } = useContext(CartContext);
    const navigate = useNavigate();
    const hundleDeleteOrder = (orderId) => {
        deleteOrder(orderId);
        const filteredOrders = myOrders.filter((order) => order.id !== orderId);
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        localStorage.removeItem('orderId');
        localStorage.removeItem('cartItems');
    };

    const hundleContinueCart = (restaurantId, inNavigate) => {
        const reservation = myReservations.find((order) => {
            return (
                order.restaurant_id === restaurantId &&
                order.status.length === 0
            );
        });

        if (reservation) {
            fetchOrder(reservation.id).then((order) => {
                updateCart(order.items, order.id);
                navigate(inNavigate);
            });
        } else {
            console.warn('No reservation found for this restaurant.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const hundleDeleteMyOrder = async (orderId) => {
        await deleteOrder(orderId);
        const filteredOrders = myOrders.filter((order) => order.id !== orderId);
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        updateCart([], '');
    };

    const hundleUpdateOrderStatusDelete = async (orderId) => {
        updateCartStatus(orderId, 'cencelled').then(() => {
            const updatedOrders = myOrders.map((o) => 
                o.id === orderId 
                    ? {
                        ...o,
                        status: [
                            ...o.status,
                            {
                                status: 'cancelled',
                                updated_at: new Date().toISOString(),
                            },
                        ],
                    }
                    : o
            );
            setMyOrders(updatedOrders);
            localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
        });
    };

    const ShowOrder = order.total_price > 0 && (
        <div key={order.id} className="order-item">
            <h2 className="order-title">
                {restaurantMap[order.restaurant_id]} -{' '}
                {order.total_price}₪
            </h2>
            {order.status.length === 0 ? (
                <>
                    <button
                        className="btn-continue-ordering"
                        onClick={() =>
                            hundleContinueCart(
                                order.restaurant_id,
                                `/restaurants/${order.restaurant_id}/`
                            )
                        }
                    >
                        Continue Ordering
                    </button>
                    <button
                        className="btn-checkout-order"
                        onClick={() =>
                            hundleContinueCart(
                                order.restaurant_id,
                                `/my-orders/checkout/${order.id}`
                            )
                        }
                    >
                        Checkout
                    </button>
                    <button
                        className="btn-delete-order"
                        onClick={() => {
                            Number(order.id) === Number(orderId)
                                ? hundleDeleteMyOrder(order.id)
                                : hundleDeleteOrder(order.id);
                        }}
                    >
                        Delete Order
                    </button>
                </>
            ) : (
                <>
                    <p>
                        <span className="updated-time">
                            <span>
                                updated time:{' '}
                                {formatDate(
                                    order.status[
                                        order.status.length - 1
                                    ].updated_at
                                )}
                            </span>
                        </span>
                    </p>
                    <div className="order-status">
                        <span
                            className={
                                order.status[
                                    order.status.length - 1
                                ].status === 'active'
                                    ? 'order-status-active'
                                    : 'order-status-delivered'
                            }
                        >
                            Order is{' '}
                            {
                                order.status[
                                    order.status.length - 1
                                ].status
                            }
                        </span>
                        {order.status[order.status.length - 1]
                            .status === 'active' && (
                            <button
                                className="btn-update-order-status-cencel"
                                onClick={() =>
                                    hundleUpdateOrderStatusDelete(
                                        order.id
                                    )
                                }
                            >
                                Cencel Order
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
    return ShowOrder;
}

export default SingleOrder;
