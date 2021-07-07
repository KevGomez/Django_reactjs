import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppFooter,
  AppHeader,
} from "@coreui/react";
import { css } from "@emotion/core";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

const DashboardUser = React.lazy(()=>import("../../views/Dashboard/DashboardUser.js"));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class DefaultLayout extends Component {
   loading = () => (
    <div>
      
    </div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        
        <div className="app-body">
          <main className="main" style={{paddingBottom:200}}>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Route
                    path="/dashboard"
                    name="DashboardUser"
                    render={(props) => <DashboardUser {...props} />}
                  />
                  <Redirect from="/" to="/" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>

        <AppFooter>
        <Suspense fallback={this.loading()}>
            <DefaultFooter />
            </Suspense>
        </AppFooter>
  
      </div>
    );
  }
}

export default DefaultLayout;
