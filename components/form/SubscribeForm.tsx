"use client";

import { FC, useState } from "react";
import { z } from "zod";
import { emailValidator } from "@/lib/validations/email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import axios from "axios";
import InputField from "@/components/ui/InputField";

const SubscribeForm: FC = () => {
  const [formState, setFormState] = useState<
    "standby" | "loading" | "error" | "success"
  >("standby");
  type FormData = z.infer<typeof emailValidator>;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    resolver: zodResolver(emailValidator),
  });

  const subscribeNewsletter = async (email: string) => {
    try {
      setFormState("loading");
      const validatedEmail = emailValidator.parse({ email });
      await axios.post("/api/newsletter", { email: validatedEmail });
      setFormState("success");
      setTimeout(() => {
        setFormState('standby');
      }, 5000);
    } catch (error) {
      setFormState("error");
      setError("root", { message: "Something went wrong..." });
    } finally {
      resetField("email");
    }
  };
  const submitAction = async (data: FormData) => {
    await subscribeNewsletter(data.email);
  };

  return (
    <form
      className={"max-w-xl flex flex-col"}
      onSubmit={handleSubmit(submitAction)}
    >
      <div className={"mt-2 flex flex-row"}>
        <InputField
          register={register}
          fieldName={"email"}
          className={"rounded-r-none"}
          placeholder={"john@example.com"}
          onChange={() => {
            setFormState("standby");
            clearErrors();
          }}
        />
        <Button
          className={"px-4 rounded-l-none"}
          disabled={formState === "loading"}
        >
          Subscribe
        </Button>
      </div>
      {formState === "success" ? (
        <p className={"mt-1 text-sm text-green-600 text-start pl-1"}>
          Successfully subscribed!
        </p>
      ) : (
        <p className={"mt-1 text-sm text-red-600 text-start pl-1"}>
          {errors.email?.message || errors.root?.message}
        </p>
      )}
    </form>
  );
};

export default SubscribeForm;
