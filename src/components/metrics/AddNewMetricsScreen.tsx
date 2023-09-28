import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  metricsInputSchema,
  TMetricInputSchema,
} from "@/common/validation/stationaryMetricsInput";
import { useAddMetricsDataMutation } from "@/common/api/weatherQueries";
import React from "react";

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
    <div className='py-5'>
      <div className='sm:absolute right-0 bottom-[0.50rem]'></div>
      <h1 className='hidden  text-center font-bold w-full sm:flex flex-row justify-center py-5'>
        Добавяне на показател
      </h1>
      <button
        className='hidden sm:block absolute right-2 top-2 text-[22px] text-red-500'
        onClick={hideForm}
      >
        X
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center gap-3 px-5 w-full'>
          <FormInput
            label={"Username:"}
            errors={errors?.username}
            {...register("username")}
          />
          <FormInput
            label={"Email:"}
            errors={errors?.email}
            {...register("email")}
          />
          <FormInput
            label={"Temperature:"}
            inputMode={"numeric"}
            errors={errors?.temperature}
            {...register("temperature", { valueAsNumber: true })}
          />
          <FormInput
            label={"Wind speed:"}
            inputMode={"numeric"}
            errors={errors?.wind_speed}
            {...register("wind_speed", { valueAsNumber: true })}
          />
          <FormInput
            label={"Humidity:"}
            inputMode={"numeric"}
            errors={errors?.humidity}
            {...register("humidity", { valueAsNumber: true })}
          />
          <FormInput
            label={"Pressure:"}
            inputMode={"numeric"}
            errors={errors?.pressure}
            {...register("pressure", { valueAsNumber: true })}
          />
          <FormInput
            label={"Rain:"}
            inputMode={"numeric"}
            errors={errors?.rain_1h}
            {...register("rain_1h", { valueAsNumber: true })}
          />
          <button
            type='submit'
            className='bg-orange-500 p-2  rounded-lg justify-center text-white'
          >
            Изпрати
          </button>
        </div>
        <div className='w-full justify-center flex'></div>
      </form>
    </div>
  );
}

const FormInput = React.forwardRef(
  ({ onChange, inputMode = "text", onBlur, name, label, errors }: any, ref) => (
    <label className='flex flex-col'>
      {label}
      <input
        type='text'
        name={name}
        ref={ref as any}
        onChange={onChange}
        onBlur={onBlur}
        inputMode={inputMode}
        className={`rounded-lg ${
          errors && "border-2 border-red-500"
        } px-4 bg-slate-200`}
      />
      <p className='text-red-500 text-[12px]'>{errors && errors.message}</p>
    </label>
  )
);
FormInput.displayName = "FormInput";
