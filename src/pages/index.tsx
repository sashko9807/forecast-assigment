import Image from "next/image";

import { useRef, useState } from "react";
import { useGetLatestForecastDataQuery } from "@/common/api/weatherQueries";

import { storeWrapper } from "@/common/redux/store";
import { apiSlice } from "@/common/api/apiSlice";
import ForecastPanel from "@/components/forecast/ForecastPanel";

const CITY_SELECTOR = [
  {
    city: "Sofia",
    country: "Bulgaria",
    full: "Sofia,Bulgaria",
  },
  {
    city: "London",
    country: "England",
    full: "London,England",
  },

  {
    city: "Berlin",
    country: "Germany",
    full: "Berlin,Germany",
  },
  {
    city: "Stockholm",
    country: "Sweden",
    full: "Stockholm,Sweden",
  },
  {
    city: "Rome",
    country: "Italy",
    full: "Rome,Italy",
  },
  {
    city: "Brussel",
    country: "Belgium",
    full: "Brussel,Belgium",
  },
  {
    city: "Paris",
    country: "France",
    full: "Paris, France",
  },
];

export default function IndexPage({ city }: any) {
  const [selectedCity, setSelectedCity] = useState(CITY_SELECTOR[0]);

  const [showDropDown, setShowDropDown] = useState(false);
  const changedCityRef = useRef(false);

  const { data = {}, isLoading } = useGetLatestForecastDataQuery(
    selectedCity.full,
    { refetchOnMountOrArgChange: true, skip: !changedCityRef.current },
  );

  const showCityDropdownSelector = () => {
    setShowDropDown(!showDropDown);
  };

  const handleCitySelect = (value: any) => {
    setSelectedCity(value);
    changedCityRef.current = true;
    setShowDropDown(false);
  };

  return (
    <div>
      <main className="w-full flex p-4">
        {/*Select city section*/}
        <div className="flex flex-col mt-10 w-full justify-center items-center ">
          <div className="w-full  max-w-[1200px] relative flex flex-col  py-5 gap-2">
            <div
              className="flex justify-between w-36 shadow-sm"
              onClick={showCityDropdownSelector}
              aria-label="select-city"
            >
              <h1 className="text-white">Изберете град</h1>
              <Image
                className="items-center"
                src={"/icons/right-arrow.svg"}
                width={20}
                height={20}
                alt="select-city"
              />
            </div>
            {showDropDown && (
              <div
                className="w-60 p-5 rounded-lg bg-white absolute shadow-md"
                aria-label="city-dropdown"
              >
                {CITY_SELECTOR.map((value, index) => (
                  <div
                    className="text-black"
                    key={index}
                    aria-label={`${value.city}`}
                    onClick={() => handleCitySelect(value)}
                  >
                    {value.city}
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-2xl text-white">{selectedCity.city}</h2>
            <h2 className="text-2xl text-white">{selectedCity.country}</h2>
          </div>
          <ForecastPanel />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store: any) => async () => {
    const { getLatestForecastData } = apiSlice.endpoints as any;
    store.dispatch(getLatestForecastData.initiate("Sofia,Bulgaria"));
    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {
        city: "Sofia,Bulgaria",
      },
    };
  },
);
