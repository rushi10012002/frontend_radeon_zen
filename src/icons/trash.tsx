

const TrashIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6Zm4 12H8v-9h2v9Zm6 0h-2v-9h2v9Zm.618-15L15 2H9L7.382 4H3v2h18V4h-4.382Z" />
    </svg>
);

export default TrashIcon;