import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [memory, setMemory] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleMemory = (e) => {
    setMemory(e.target.value.split(","));
  };

  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeProduct = (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      categories: cat,
      color: color,
      memory: memory,
    };
    updateProduct(productId, product, dispatch);
    toast.success("Cập nhật thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const MONTHS = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thời gian tạo:</span>
              <span className="productInfoValue">{product.createdAt}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Cập nhật gần nhất:</span>
              <span className="productInfoValue">{product.updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder={product.title}
            />
            <label>Mô tả</label>
            <input
              type="text"
              name="desc"
              onChange={handleChange}
              placeholder={product.desc}
            />
            <label>Giá tiền</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              placeholder={product.price}
            />
            <label>Giảm giá</label>
            <input
              type="text"
              name="sale1"
              onChange={handleChange}
              placeholder={product.sale1}
            />
          </div>
          <div className="productFormLeft">
            <label>Bộ nhớ</label>
            <input
              type="text"
              name="memory"
              onChange={handleChange}
              placeholder={product.memory}
            />
            <label>Giá gốc</label>
            <input
              type="text"
              name="pricesale"
              onChange={handleChange}
              placeholder={product.pricesale}
            />
            <label>Ảnh sản phẩm</label>
            <input
              type="text"
              name="imgProduct"
              onChange={handleChange}
              placeholder={product.imgProduct}
            />
            <label>Trả góp</label>
            <input
              type="text"
              name="titletragop"
              onChange={handleChange}
              placeholder={product.titletragop}
            />
          </div>
          <div className="productFormLeft">
            <label>Chip</label>
            <input
              type="text"
              name="chip"
              onChange={handleChange}
              placeholder={product.chip}
            />
            <label>Ram</label>
            <input
              type="text"
              name="ram"
              onChange={handleChange}
              placeholder={product.ram}
            />
            <label>Kích thước</label>
            <input
              type="text"
              name="kichthuoc"
              onChange={handleChange}
              placeholder={product.kichthuoc}
            />
            <label>Trọng lượng</label>
            <input
              type="text"
              name="trongluong"
              onChange={handleChange}
              placeholder={product.trongluong}
            />
          </div>
          <div className="productFormLeft">
            <label>Color</label>
            <input
              type="text"
              placeholder={product.color}
              onChange={handleColor}
            />

            <label>Categories</label>
            <input
              type="text"
              placeholder={product.categories}
              onChange={handleCat}
            />

            <label>Memory</label>
            <input
              type="text"
              placeholder={product.memory}
              onChange={handleMemory}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button onClick={changeProduct} className="productButton">
              Update
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}
