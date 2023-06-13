import {TextareaHTMLAttributes} from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextAreaProps<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textArea?:boolean
  register: UseFormRegister<T>;
  fieldName: Path<T>;
}

function TextArea<T extends FieldValues>({
  register,
  fieldName,
  className,
  onChange: onChangePlugin,
  ...props
}: TextAreaProps<T>) {
  return (
    <textarea
      {...register(fieldName)}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm " +
          "placeholder:text-gray-400 text-sm md:text-md md:leading-6 dark:focus:ring-amber-300 " +
          "focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none",
        className
      )}
      aria-label={fieldName}
      title={fieldName}
      onChange={async (e) => {
        await register(fieldName).onChange(e);
        onChangePlugin && onChangePlugin(e);
      }}
      {...props}
    />
  );
}

export default TextArea;
