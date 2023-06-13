import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className={"flex flex-col items-center h-[92vh]"}>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-3xl">No events found...</p>
      </div>
    </div>
  );
};

export default NotFound;
