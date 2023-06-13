import {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string | undefined;
  children?: ReactNode | undefined;
}

const Button: FC<ButtonProps> = ({
  link,
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonConfig: string =
    "text-gray-50 bg-teal-500 hover:bg-teal-400 border-3 border-teal-500 text-center rounded-lg disabled:opacity-70 " +
    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-amber-300 " +
    "dark:disabled:bg-gray-500 dark:disabled:text-gray-400 disabled:bg-gray-300 disabled:text-gray-100 " +
    "enabled:active:scale-95 enabled:cursor-pointer";
  return (
    <button className={cn(buttonConfig, className)} {...props}>
      {link ? (
        <Link href={link} className={"inline-block w-full h-full px-6 py-2"}>
          {children}
        </Link>
      ) : (
        <p>{children}</p>
      )}
    </button>
  );
};

export default Button;
