import './Label.css';



interface labelProps {
    htmlFor?: string;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    children?: React.ReactNode;
}


export default function Label(props: labelProps) {
    return <label htmlFor={props.htmlFor} className={"nc-label " + (props.className || "")} style={props.style} id={props.id}>{props.children}</label>;
}