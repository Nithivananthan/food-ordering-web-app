import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./components/cart";
import Buyitems from "./components/Buyitems";
import ThankYouPage from "./components/Thankyoupage";
import MobileAppPage from "./components/Mobile-app";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import MyOrders from "./components/Myorders";
import Contact from "./components/Contact";

function AppWrapper() {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
}

function App({ navigate }) {
  const [categories, setcategories] = useState([]);
  const [foodinf, setfoodinf] = useState([]);
  const [nav, setnav] = useState(false);
  const [user, setUser] = useState('');
  const [token, settoken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert("profile fetch failed: " + err.message);
      }
    };
    if (token) fetchprofile();
  }, [token]);

  function handlelogout() {
    localStorage.removeItem('token');
    settoken('');
    setUser('');
    navigate('/login');
  }

  useEffect(() => {
    const checkToken = () => {
      settoken(localStorage.getItem('token'));
    };
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const [customer, setcustomer] = useState({
    quantity: "",
    name: "",
    number: "",
    address: ""
  });

  const [buyitem, setbuyitem] = useState({
    foodimage: "",
    foodname: "",
    foodprice: ""
  });

  const price = Number(buyitem.foodprice.replace('$', ''));
  const quantity = Number(customer.quantity);
  const total = price * quantity;

  const [completeorder, setcompleteorder] = useState({
    foodimage: "",
    foodname: "",
    foodprice: "",
    foodquantity: "",
    name: "",
    number: "",
    address: "",
    totalprice: "",
    id:""
  });
  const [cart, setcart] = useState(() => {
    const storedCart = localStorage.getItem("cartdetails");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  function addcart(foodinf) {
    setcart((prevcart) => [...prevcart, foodinf]);
  }

  function handeldelete(index) {
    setcart((prevcart) =>
      prevcart.filter((_, prevcartindex) => prevcartindex !== index)
    );
  }

  useEffect(() => {
    localStorage.setItem("cartdetails", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setcategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchcategories();
  }, []);

  useEffect(() => {
    const fetchfoodinf = async () => {
      try {
        const res = await axios.get("/api/foodinformation");
        setfoodinf(res.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchfoodinf();
  }, []);

  function handelitem(foodinf) {
    setbuyitem({
      foodimage: foodinf.foodimage,
      foodname: foodinf.foodname,
      foodprice: foodinf.foodprice
    });
  }

function order() {
  if (!user || !user._id) {
    alert("You must be logged in to place an order.");
    navigate('/login');
    return false; 
  }

  const orderData = {
    foodimage: buyitem.foodimage,
    foodname: buyitem.foodname,
    foodprice: buyitem.foodprice,
    foodquantity: customer.quantity,
    name: customer.name,
    number: customer.number,
    address: customer.address,
    totalprice: total,
    id: user._id
  };
  setcompleteorder(orderData);

  axios.post("/api/orders", orderData)
    .then((res) => {
      console.log("Order saved:", res.data);
    })
    .catch((err) => {
      console.error("Error saving order:", err);
    });

  setbuyitem({ foodimage: "", foodname: "", foodprice: "" });
  setcustomer({ quantity: "", name: "", number: "", address: "" });

  return true; 
}return (
    <>
      <Navbar token={token} setnav={setnav} nav={nav} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handelitem={handelitem}
              setnav={setnav}
              nav={nav}
              categories={categories}
              handeldelete={handeldelete}
              addcart={addcart}
              cart={cart}
              foodinf={foodinf}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} handelDelete={handeldelete} />} />
        <Route path="/buyitem" element={<Buyitems setcustomer={setcustomer} order={order} total={total} />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/mobileapp" element={<MobileAppPage />} />
        <Route path="/login" element={<Login settoken={settoken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <Profile
            handlelogout={handlelogout}
            user={user}
            settoken={settoken}
            token={token}
          />} />
      <Route path="/myorder" element={<MyOrders user={user}/>}/>
      <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  );
}
export default function MainApp() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
