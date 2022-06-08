import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OfficeProductsNew from "./pages/admin/products/new";
import OfficeProductList from "./pages/admin/products/list";
import OrderList from "./pages/admin/orders";
import Login from "./pages/login";
import OfficeBlogsNew from "./pages/admin/blogs/new";
import OfficeBlogsList from "./pages/admin/blogs/list";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`/`} component={OfficeProductsNew} />
        <Route exact path={`/products`} component={OfficeProductList} />
        <Route exact path={`/products/new`} component={OfficeProductsNew} />
        <Route exact path={`/orders`} component={OrderList} />
        <Route exact path={`/login`} component={Login} />
        <Route exact path={`/blogs`} component={OfficeBlogsList} />
        <Route exact path={`/blogs/new`} component={OfficeBlogsNew} />
      </Switch>
    </Router>
  );
}

export default App;
