import React from "react";

const sizeClasses = {
  txtMontserratSemiBold64: "font-montserrat font-semibold",
  txtMontserratBold16: "font-bold font-montserrat",
  txtMontserratMedium20: "font-medium font-montserrat",
  txtMontserratRegular14: "font-montserrat font-normal",
  txtMontserratSemiBold48: "font-montserrat font-semibold",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
