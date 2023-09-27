

const CreateMailIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6Zm1 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2Z" />
    </svg>
);

export default CreateMailIcon;