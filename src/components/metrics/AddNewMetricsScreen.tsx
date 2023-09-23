import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  metricsInputSchema,
  TMetricInputSchema,
} from "@/common/validation/stationaryMetricsInput";
import { useAddMetricsDataMutation } from "@/common/api/weatherQueries";

export default function AddNewMetricScreen({ hideForm }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TMetricInputSchema>({
    resolver: zodResolver(metricsInputSchema),
  });

  const [addMetrics, { isLoading, isSuccess, isError }] =
    useAddMetricsDataMutation();
  const onSubmit: SubmitHandler<TMetricInputSchema> = async (data) => {
    try {
      const metrics = await addMetrics({ data }).unwrap();
      if (metrics.status === 201) {
        alert("Metrics successfully added");
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-5">
      <div className="sm:absolute right-0 bottom-[0.50rem]"></div>
      <h1 className="hidden  text-center font-bold w-full sm:flex flex-row justify-center py-5">
        Добавяне на показател
      </h1>
      <button
        className="hidden sm:block absolute right-2 top-2 text-[22px] text-red-500"
        onClick={hideForm}
      >
        X
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-3 px-5 w-full">
          <label className="flex flex-col">
            Username:
            <input
              type="text"
              className={`rounded-lg ${
                errors.username && " border-2 border-red-500"
              } bg-slate-200 px-4`}
              {...register("username")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.username && errors.username.message}
            </p>
          </label>
          <label className={`flex flex-col`}>
            Email:
            <input
              type="email"
              className={`rounded-lg ${
                errors.email && " border-2 border-red-500"
              } bg-slate-200 px-4`}
              {...register("email")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.email && errors.email.message}
            </p>
          </label>
          <label className={`flex flex-col`}>
            Temperature:
            <input
              type="text"
              inputMode="numeric"
              className={`rounded-lg ${
                errors.temperature && "border-2 border-red-500"
              } px-4 bg-slate-200`}
              {...register("temperature")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.temperature && errors.temperature.message}
            </p>
          </label>
          <label className="flex flex-col">
            Wind speed:
            <input
              type="text"
              inputMode="numeric"
              className={`rounded-lg ${
                errors.wind_speed && " border-2 border-red-500"
              } px-4 bg-slate-200`}
              {...register("wind_speed")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.wind_speed && errors.wind_speed.message}
            </p>
          </label>
          <label className="flex flex-col">
            Humidity:
            <input
              type="text"
              inputMode="numeric"
              className={`rounded-lg ${
                errors.humidity && "border-2 border-red-500"
              } px-4 bg-slate-200`}
              {...register("humidity")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.humidity && errors.humidity.message}
            </p>
          </label>
          <label className="flex flex-col">
            Pressure:
            <input
              type="text"
              inputMode="numeric"
              className={`rounded-lg ${
                errors.pressure && "border-2 border-red-500"
              } px-4 bg-slate-200`}
              {...register("pressure")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.pressure && errors.pressure.message}
            </p>
          </label>
          <label className="flex flex-col">
            Rain:
            <input
              type="text"
              inputMode="numeric"
              className={`rounded-lg ${
                errors.rain && "border-2 border-red-500"
              } px-4 bg-slate-200`}
              {...register("rain")}
            />
            <p className="text-red-500 text-[12px]">
              {errors.rain && errors.rain.message}
            </p>
          </label>
          <input
            type="submit"
            className="bg-orange-500 p-2  rounded-lg justify-center text-white"
            value="Изпрати"
          />
        </div>
        <div className="w-full justify-center flex"></div>
      </form>
    </div>
  );
}
