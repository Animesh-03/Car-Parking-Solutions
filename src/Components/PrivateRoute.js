import { Route } from "react-router-dom/cjs/react-router-dom.min"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"

export function PrivateRoute ({component: Component, authenticated, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? (() =>{console.log("Auth" + authenticated); return true;}) && <Component {...props} />
          : (() =>{console.log("Not Auth" + authenticated); return true;}) && <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }