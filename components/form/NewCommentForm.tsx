"use client";

import {
  AreaHTMLAttributes,
  FC,
  useState,
} from "react";
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
  const [stateOK, setStateOK] = useState(false);
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

  const postComment = async (comment: Omit<EventComment, "id">) => {
    try {
      const validatedComment = commentValidator.parse(comment);
      await axios.post(`/api/comments/${params.eventId}`, validatedComment);
      setStateOK(true);
      setTimeout(() => {
        setStateOK(false);
      }, 5000);
      resetField("email");
      resetField("name");
      resetField("text");
    } catch (error) {
      setError("root", { message: "Something went wrong!" });
      setStateOK(false);
    }
  };
  const submitAction = async (data: FormData) => {
    await postComment(data);
  };

  const clearErrorPrompt = () => {
    clearErrors();
    setStateOK(false);
  };

  return (
    <div className={cn("max-w-3xl lg:w-full w-9/12", className)}>
      <form onSubmit={handleSubmit(submitAction)}>
        <div className={"flex flex-col gap-2 leading-6"}>
          <div className={"mt-2 flex flex-row gap-1"}>
            <div className={"flex flex-col flex-1"}>
              <label htmlFor={"name"} className={"font-light pl-1"}>
                name:
              </label>
              <InputField
                id={"name"}
                register={register}
                fieldName={"name"}
                placeholder={"John Doe"}
                onChange={clearErrorPrompt}
              />
            </div>
            <div className={"flex flex-col flex-1"}>
              <label htmlFor={"email"} className={"font-light pl-1"}>
                email:
              </label>
              <InputField
                id={"email"}
                register={register}
                fieldName={"email"}
                placeholder={"john@example.com"}
                onChange={clearErrorPrompt}
              />
            </div>
          </div>

          <TextArea
            className={"h-32 resize-none overflow-auto"}
            register={register}
            fieldName={"text"}
            placeholder={"Comment something sparkling..."}
            onChange={clearErrorPrompt}
          />
          <Button className={"px-4 font-semibold h-10"}>Post</Button>
        </div>
        <div>
          {stateOK ? (
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
