"use client";

import Button from "../../../../components/UI/button";
import Select from "../../../../components/UI/select";

import RadioCheckbox from "./radioCheckbox";

import {
  paymentOptions,
  shippingOptions,
  COUNTRIES,
} from "../../../../constants";

const ZodForm = ({
  register,
  watch,
  errors,
  setValue,
  handleSubmit,
  vippsHandler,
  isLoading,
  disabled
}) => {
  return (
    <section className="w-full space-y-8">
      <form className="w-full space-y-8" onSubmit={handleSubmit(vippsHandler)}>
        <RadioCheckbox
          title="Frakt"
          optionList={shippingOptions}
          radioValue={watch("shipping")}
          setValue={setValue}
          id="shipping"
        />
        <RadioCheckbox
          title="Betaling"
          optionList={paymentOptions}
          radioValue={watch("payment")}
          setValue={setValue}
          id="payment"
        />

        <div className="space-y-8 md:border md:border-gray-300 md:p-8">
          <div className="w-full space-y-1">
            <label>Fullt Navn </label>
            <input
              type="text"
              className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                errors.name?.message ? "border-red-400" : "border-gray-400"
              }`}
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 space-y-1">
              <label>Epost </label>
              <input
                type="email"
                className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                  errors.email?.message ? "border-red-400" : "border-gray-400"
                }`}
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-1">
              <label>Telefon nummer </label>
              <input
                type="number"
                className={`w-full outline-none py-[10px] pl-[15px] text-black border rounded-sm ${
                  errors.phone?.message ? "!border-red-400" : "border-gray-400"
                }`}
                {...register("phone", {
                  required: "Ugyldig telefonnummer",
                  valueAsNumber: true,
                })}
              />
              {errors.phone?.message && (
                <p className="text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 space-y-1">
              <label>Land</label>
              <Select
                options={COUNTRIES}
                placeholder="Velg land"
                setValue={setValue}
              />
              {errors.country?.message && (
                <p className="text-sm text-red-400">{errors.country.message}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-1">
              <label>By </label>
              <input
                type="text"
                className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                  errors.city?.message ? "border-red-400" : "border-gray-400"
                }`}
                {...register("city")}
              />
              {errors.city?.message && (
                <p className="text-sm text-red-400">{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className="w-full space-y-1">
            <label>Addresse </label>
            <input
              type="text"
              className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                errors.address?.message ? "border-red-400" : "border-gray-400"
              }`}
              {...register("address")}
            />
            {errors.address?.message && (
              <p className="text-sm text-red-400">{errors.address.message}</p>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 space-y-1">
              <label>Addresse linje 2 </label>
              <input
                type="text"
                placeholder="(Valgfri)"
                className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                  errors.address2?.message
                    ? "border-red-400"
                    : "border-gray-400"
                }`}
                {...register("address2")}
              />
              {errors.address2?.message && (
                <p className="text-sm text-red-400">
                  {errors.address2.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-1">
              <label>Post kode </label>
              <input
                type="number"
                className={`w-full py-[10px] pl-[15px] text-black border rounded-sm ${
                  errors.postalCode?.message
                    ? "border-red-400"
                    : "border-gray-400"
                }`}
                {...register("postalCode", {
                  required: "Må være et gylding post nummer",
                  valueAsNumber: true,
                })}
              />
              {errors.postalCode?.message && (
                <p className="text-sm text-red-400">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button type="submit" disabled={isLoading || disabled}>
              Place order
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ZodForm;
