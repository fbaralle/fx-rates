import React from "react";
import { Container } from "@material-ui/core";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: "#212121",
          color: "white",
          padding: 50,
          height: "100vh",
          overflow: "scroll",
        }}
      >
        <Container
          maxWidth="lg"
          style={{
            padding: 50,
            margin: "auto",
            borderWidth: 1,
            borderColor: "#505050",
            borderStyle: "solid",
          }}
        >
          {props.children}
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
