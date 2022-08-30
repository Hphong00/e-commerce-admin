import { useLocation } from "react-router-dom";
import "./order.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Order() {
  var checkError;
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  const numberProduct = order.products.length;
  const [selected, setSelected] = useState(null);

  const updateOrder = async () => {
    try {
      const res = await userRequest.put(`/orders/${orderId}`, {
        status: selected,
      });
    } catch {
      checkError = true;
    } finally {
      // navigator("/")
      // showToast(checkError);
    }
  };
  const showToast = (checkError) => {
    if (checkError) {
      toast.error("Cập nhật thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!checkError) {
      toast.success("Cập nhật không thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Order</h1>
      </div>
      <div className="orderBottom">
        <form className="orderForm">
          <div className="orderFormLeft">
            <label>ID đơn hàng</label>
            <div>{order._id}</div>
            <label>ID người đặt</label>
            <div>{order.userId}</div>
            <label>Tổng tiền đơn hàng</label>
            <div>{order.amount}</div>
            <label>Thời gian tạo</label>
            <div>{order.createdAt}</div>
          </div>
          <div className="orderFormLeft">
            <label>Địa điểm giao hàng</label>
            <div className="valueOrder">{order.address.line1}</div>
            <label>Thành phố</label>
            <div>{order.address.city}</div>
            <label>Quốc gia</label>
            <div>{order.address.country}</div>
            <label>Mã bưu điện</label>
            <div>{order.address.postal_code}</div>
          </div>
          <div className="orderFormLeft">
            <label>ID sản phẩm đã mua</label>
            {[...Array(numberProduct)].map((elementInArray, index) => (
              <div className="" key={index}>
                {" "}
                {order.products[index].productId}{" "}
              </div>
            ))}
          </div>
          <div className="orderFormLeft">
            <label>Số lượng</label>
            {[...Array(numberProduct)].map((elementInArray, index) => (
              <div className="" key={index}>
                {" "}
                {order.products[index].quantity}.0{" "}
              </div>
            ))}
          </div>
          <div className="orderFormLeft">
            <label>Trạng thái đơn hàng</label>
            <select
              name="status"
              onChange={(e) => setSelected(e.target.value || null)}
              value={selected || order.status}
            >
              <option name="status" value="Chờ xác nhận">
                Chờ xác nhận
              </option>
              <option name="status" value="Chờ giao lấy hàng">
                Chờ giao lấy hàng
              </option>
              <option name="status" value="Đang giao">
                Đang giao
              </option>
              <option name="status" value="Thành công">
                Thành công
              </option>
            </select>
            <label></label>
            <button onClick={updateOrder} className="productButton">
              Cập nhật
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}
