import * as React from "react";

const VideoIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13.758 12 11.2 13.705v-3.41L13.758 12Z" />
        <path
            fillRule="evenodd"
            d="M2.41 2.837a45.77 45.77 0 0 1 19.18 0A3.049 3.049 0 0 1 24 5.817v12.365a3.048 3.048 0 0 1-2.41 2.981 45.769 45.769 0 0 1-19.18 0A3.048 3.048 0 0 1 0 18.183V5.817a3.049 3.049 0 0 1 2.41-2.981Zm8.434 5.297A.8.8 0 0 0 9.6 8.8v6.4a.8.8 0 0 0 1.244.666l4.8-3.2a.8.8 0 0 0 0-1.332l-4.8-3.2Z"
            clipRule="evenodd"
        />
    </svg>
);

export default VideoIcon;