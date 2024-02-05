import React from "react";
import { Outlet } from "react-router-dom";

//styles
import "./Wrapper.style.css";

const WrapperForm = () => {
  return (
    <main className="wrapper-form">
      <div className="titles">
        <h1 className="main-title">Moon notes</h1>
        <h4 className="sub-title">Servicio gratuito de notas</h4>
      </div>
      <Outlet />
    </main>
  );
};

export default WrapperForm;
