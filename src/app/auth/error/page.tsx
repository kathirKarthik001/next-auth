import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="bg-red-200 p-7 rounded text-center ">
        <div className=" text-3xl font-extrabold mb-5">
          Oops ! Error Occured !
        </div>
        <Link href={"/auth/login"} className=" text-center underline mt-3">Back to login Page</Link>
      </div>
    </div>
  );
};

export default page;
