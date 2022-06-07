import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import OfficeProductsNew from "./pages/admin/products/new";
import OfficeProductList from "./pages/admin/products/list";
import OrderList from "./pages/admin/orders";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`/`} component={OfficeProductsNew} />
        <Route exact path={`/products`} component={OfficeProductList} />
        <Route exact path={`/products/new`} component={OfficeProductsNew} />
        <Route exact path={`/orders`} component={OrderList} />
      </Switch>
    </Router>
  );
}

export default App;
