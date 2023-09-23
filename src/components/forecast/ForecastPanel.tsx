import { useState } from "react";
import CurrentWeatherScreen from "./CurrentForecastScreen";
import DailyForecastScreen from "./DailyForecastScreen";

const FORECAST_OPTIONS = [
  {
    label: "В момента",
    component: <CurrentWeatherScreen />,
  },
  {
    label: "24 часа",
    component: <DailyForecastScreen />,
  },
];

export default function ForecastPanel() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuSelect = (index: any) => {
    setSelectedMenu(index);
  };

  return (
    <div className="w-full  max-w-[1200px] flex flex-col">
      <div
        className={`flex flex-row  justify-center sm:justify-start  sm:border-none border-orange-500  gap-1`}
      >
        {FORECAST_OPTIONS.map((value, index) => (
          <div
            key={index}
            className={`p-4 text-center
              sm:h-[45px] 
              self-end
              border-b-4
              w-full
              sm:w-fit
              ${
                selectedMenu === index &&
                "active !border-b-0  sm:!w-[330px] sm:h-[70px] hidden sm:block"
              } 
               bg-white
               border-orange-500
              [&.active]:border-t-4
              `}
            onClick={() => handleMenuSelect(index)}
          >
            {value.label}
          </div>
        ))}
      </div>
      {FORECAST_OPTIONS[selectedMenu].component}
    </div>
  );
}
