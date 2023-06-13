"use client";

import { FC, FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import moment from "moment";
import { useRouter } from "next/navigation";

const EventSearch: FC = () => {
  const years = ["2022", "2023", "2024"];
  const months = moment.months();
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");

  const router = useRouter();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!year || !month) return;
    router.push(`/events?year=${year}&month=${month}`)
  };
  return (
    <>
      <form
        className={
          "flex flex-col md:flex-row gap-4 justify-between w-9/12 max-w-2xl shadow-md dark:shadow-gray-950 " +
        "rounded-xl p-4 mx-auto mb-12"
        }
        onSubmit={submitHandler}
      >
        <div className={"flex flex-col md:flex-row gap-4 w-full md:w-10/12"}>
          <div className={"flex flex-1 gap-4 items-center justify-between"}>
            <label htmlFor={"year"} className={"font-bold"}>
              Year
            </label>
            <select
              id={"year"}
              className={
                "bg-white dark:bg-slate-700 py-1 text-center w-9/12 md:w-full rounded-md"
              }
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">-- Select Year --</option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={"flex flex-1 gap-4 items-center justify-between"}>
            <label htmlFor={"month"} className={"font-bold"}>
              Month
            </label>
            <select
              id={"month"}
              className={
                "bg-white dark:bg-slate-700 py-1 text-center w-9/12 md:w-full rounded-md"
              }
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">-- Select Month --</option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          className={"w-full md:w-1/5 py-1 px-2"}
          disabled={!year || !month}
        >
          Find Events
        </Button>
      </form>
    </>
  );
};

export default EventSearch;
