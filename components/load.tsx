import { NextPage } from "next";
import Image from "next/image";

export const Loading:NextPage<{message:string, width:number, height:number}> = ({message, width, height}) =>{
  return(
    <div className="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div className="mx-auto max-w-md">
      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 leading-7">
          <ul className="space-y-4">
            <li className="flex items-center">
              <p className="ml-4">
                <strong className="italic">{message}</strong> 
                <Image src="./bars.svg" alt="Loading..." width={width} height={height} />
              </p>
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};