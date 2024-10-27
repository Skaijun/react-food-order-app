export default function Input({ label, id, className, ...props }) {
    let classNames = 'control';
    if (className) {
        classNames += ` ${className}`;
    }

    return <div className={classNames}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} />
    </div>
}