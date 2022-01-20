import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   // let buttonClass = {button: true};
   // let propsKeys = Object.keys(props)
   // for (const key of propsKeys) {
   //    buttonClass[`button--${key}`] = true;
   // }
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
  

   return (
      <button
         // className={classNames(buttonClass)}
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
