import * as React from "react";

const DownloadIcon = ({ size = 38, strokeWidth = 1, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" />
        <path d="m16 12-4 4-4-4" />
        <path d="M12 16V4" />
    </svg>
);

export default DownloadIcon;