import classes from "./Button.module.scss"

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "default" | "edit" | "delete" | "add" | "close" | "employee"
}

const Button = ({
  variant = "default",

  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={`${classes[variant]} ${classes.large}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
