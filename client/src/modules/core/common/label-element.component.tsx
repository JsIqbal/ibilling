interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;
    title: string;
    className?: string;
}

const Label = ({ htmlFor, title, className }: LabelProps) => {
    return (
        <label className={className} htmlFor={htmlFor}>
            {title}
        </label>
    );
};

export default Label;
