

const SendIcon = ({ size = 25, color = "rgb(110, 196, 250)", ...props }) => (
    <svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.85L12 12l-7.758 2.91-1.212 4.848a.998.998 0 0 0 1.396 1.147l17-8a1.001 1.001 0 0 0 0-1.81Z" />
    </svg>
);

export default SendIcon;