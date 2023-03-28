import React, { useEffect, useRef } from "react";
import AdminHome from "./pages/Admin/AdminHome";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, logOutUser } from "./store/userAuth";
import ResetPassword from "./pages/ResetPassword";
import Shop from "./pages/Shop";
import HeaderSec from "./components/HeaderSec";
import { closeModal } from "./store/modal";
import Modal from "./components/Modal";
import ProductsDisplay from "./pages/ProductsDisplay";
import CartPage from "./pages/CartPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCompleted from "./pages/OrderCompleted";
import MyChats from "./pages/MyChats";
import RoutesProtected from "./helper/RoutesProtected";
import AdminAuth from "./components/AdminAuth";

function Wrapper({ children }) {
  const location = useLocation();
  return <div key={location.pathname}>{children}</div>;
}

function App() {
  const [user, loading] = useAuth();
  const dispatch = useDispatch();
  const firstRender = useRef(false);
  const modal = useSelector((state) => {
    return state.modal;
  });

  useEffect(() => {
    if (user) {
      dispatch(logInUser(user));
      return;
    }
    if (firstRender.current) {
      dispatch(logOutUser());
    }
    return () => {
      firstRender.current = true;
    };
  }, [user, dispatch]);

  return (
    <div className="">
      {loading && (
        <Router>
          {modal.modal && (
            <>
              <div
                onClick={() => {
                  dispatch(closeModal());
                }}
                className="fixed cursor-pointer w-full h-full z-50  bg-[#000000cc]"
              ></div>
              <Modal asAdmin={modal.admin}></Modal>
            </>
          )}

          <Switch>
            <Route path="/" exact>
              <>
                <HeaderSec></HeaderSec>
                <Home></Home>
              </>
            </Route>
            <Route path={`/shop/:type/:navType/:id`} exact>
              <>
                <HeaderSec></HeaderSec>
                <Shop></Shop>
              </>
            </Route>
            <Route path={`/product/:brand/:name/:id`} exact>
              <Wrapper>
                <>
                  <HeaderSec></HeaderSec>
                  <ProductsDisplay></ProductsDisplay>
                </>
              </Wrapper>
            </Route>
            <Route exact path="/cart">
              <>
                <HeaderSec></HeaderSec>
                <CartPage></CartPage>
              </>
            </Route>
            <Route exact path="/MyOrders">
              <>
                <HeaderSec></HeaderSec>
                <OrderSuccess></OrderSuccess>
              </>
            </Route>
            <Route exact path="/success">
              <>
                <HeaderSec></HeaderSec>
                <OrderCompleted></OrderCompleted>
              </>
            </Route>
            <Route exact path="/myChats/:adminId/:id">
              <>
                <HeaderSec></HeaderSec>
                <MyChats></MyChats>
              </>
            </Route>
            <Route path="/reset-password">
              <>
                <HeaderSec></HeaderSec>
                <ResetPassword></ResetPassword>
              </>
            </Route>
            <Route path="/adminAuth">
              <AdminAuth></AdminAuth>
            </Route>
            <RoutesProtected
              component={AdminHome}
              path="/admin"
            ></RoutesProtected>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
