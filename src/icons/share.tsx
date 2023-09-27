import * as React from "react";

const ShareIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M18 15.002a3 3 0 0 0-2.1.86L8 12.342v-.67l7.9-3.53a3 3 0 1 0-.9-2.14v.34l-7.9 3.52a3 3 0 1 0 0 4.28l7.9 3.53v.33a3 3 0 1 0 3-3Z" />
    </svg>
);

export default ShareIcon;