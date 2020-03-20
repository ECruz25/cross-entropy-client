import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }
    async componentDidMount() {
      const token = Cookie.get("token") ? Cookie.get("token") : null;
      try {
        const Authorization = "JWT " + token;
        const response = await fetch("/api/v1/checkToken", {
          method: "post",
          headers: new Headers({
            Authorization
          })
        });
        if (response.status === 202) {
          this.setState({ loading: false });
        } else {
          const error = new Error(response.error);
          throw error;
        }
      } catch (error) {
        this.setState({ loading: false, redirect: true });
      }
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/sign-in" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
