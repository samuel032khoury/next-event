"use client";

import { AreaHTMLAttributes, FC, useState } from "react";
import { z } from "zod";
import { commentValidator } from "@/lib/validations/comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import axios from "axios";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import TextArea from "@/components/ui/TextArea";
interface NewCommentFormProps extends AreaHTMLAttributes<HTMLDivElement> {}
const NewCommentForm: FC<NewCommentFormProps> = ({
  className,
}: NewCommentFormProps) => {
  const params = useParams();
  const [formState, setFormState] = useState<
    "standby" | "loading" | "error" | "success"
  >("standby");
  type FormData = z.infer<typeof commentValidator>;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    resolver: zodResolver(commentValidator),
  });

  const postComment = async (
    comment: Omit<Omit<EventComment, "id">, "timeStamp">
  ) => {
    try {
      setFormState('loading');
      const validatedComment = commentValidator.parse(comment);
      await axios.post(`/api/comments/${params.eventId}`, validatedComment);
      setFormState('success');
      setTimeout(() => {
        setFormState('standby');
      }, 5000);
      resetField("email");
      resetField("name");
      resetField("text");
    } catch (error) {
      setError("root", { message: "Something went wrong!" });
      setFormState('error');
    }
  };
  const submitAction = async (data: FormData) => {
    await postComment(data);
  };

  const revertFormState = () => {
    clearErrors();
    setFormState('standby');
  };

  return (
    <div
      className={cn(
        "p-8 w-9/12 max-w-3xl lg:w-full rounded-xl bg-sky-100 dark:bg-slate-800 " +
          "shadow-md shadow-gray-600 dark:shadow-gray-950",
        className
      )}
    >
      <form onSubmit={handleSubmit(submitAction)}>
        <div className={"flex flex-col gap-2 leading-6"}>
          <div className={"mt-2 flex flex-row gap-1"}>
            <div className={"flex flex-col flex-1"}>
              <label htmlFor={"name"} className={"font-light pl-1"}>
                Name:
              </label>
              <InputField
                id={"name"}
                register={register}
                fieldName={"name"}
                placeholder={"John Doe"}
                className={"bg-sky-50 dark:bg-slate-700 text-current"}
                onChange={revertFormState}
              />
            </div>
            <div className={"flex flex-col flex-1"}>
              <label htmlFor={"email"} className={"font-light pl-1"}>
                Email:
              </label>
              <InputField
                id={"email"}
                register={register}
                fieldName={"email"}
                placeholder={"john@example.com"}
                className={"bg-sky-50 dark:bg-slate-700 text-current"}
                onChange={revertFormState}
              />
            </div>
          </div>

          <TextArea
            className={
              "h-32 resize-none overflow-auto bg-sky-50 dark:bg-slate-700 text-current"
            }
            register={register}
            fieldName={"text"}
            placeholder={"Comment something sparkling..."}
            onChange={revertFormState}
          />
          <Button className={"px-4 font-semibold h-10"} disabled={formState==='loading'}>Post</Button>
        </div>
        <div>
          {formState === "success" ? (
            <p className={"mt-1 text-sm text-green-600 text-start pl-1"}>
              Comment posted!
            </p>
          ) : (
            <p className={"mt-1 text-sm text-red-600 text-start pl-1"}>
              {errors.name?.message ||
                errors.email?.message ||
                errors.text?.message ||
                errors.root?.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewCommentForm;
