import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// TODO : voir pour éventuellement déporter la logique des DatePickers dans un composant dédié.
const MyDatePickerComponent = () => {
  const { control, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker {...field} />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MyDatePickerComponent;
