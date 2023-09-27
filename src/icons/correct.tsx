import * as React from "react";

const CorrectIcon = ({ size = 38, color = "black", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M17.203 6.684a.88.88 0 0 1 1.256 0 .907.907 0 0 1 .012 1.26l-7.095 8.388a.878.878 0 0 1-1.278.024L5.78 11.98a.908.908 0 0 1 .288-1.468.88.88 0 0 1 .969.196l3.662 3.711 6.48-7.71a.306.306 0 0 1 .024-.026Z" />
    </svg>
);

export default CorrectIcon;