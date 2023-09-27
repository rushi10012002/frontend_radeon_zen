import * as React from "react";

const SaveIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M14 17h-4v4h4v-4Z" />
        <path d="m20.12 8.71-4.83-4.83A3 3 0 0 0 13.17 3H10v6h5a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1V3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4h2a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12Z" />
    </svg>
);

export default SaveIcon;