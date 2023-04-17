import { NextPage } from "next";
import { dataGeoErr } from "./interface";
import Image from "next/image";

export const ErrorPage:NextPage<{geolocationErr:dataGeoErr}> = ({geolocationErr}) => {
  return(
    <div className="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div className="mx-auto max-w-md">
      <Image src="https://www.wolfpress.co/wp-content/uploads/2019/02/CRC-Error.jpg" alt="Error Message" width="340" height="170" className="rounded-full"/>
      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 leading-7">
          <p className="text-red-600 italic">An error has occured:</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <strong>Error Code:</strong> 
              <p className="ml-4 text-red-600">
                {geolocationErr.codeFromAPI}
              </p>
            </li>
            <li className="flex items-center">
              <strong>Error Message:</strong> 
              <p className="ml-4 text-red-600">
                {geolocationErr.messageFromAPI}
              </p>
            </li>
          </ul>
        </div>
        <p className="italic">Refresh the page or allows us have permission</p>
      </div>
      </div>
      </div>
    </div>
  );
};