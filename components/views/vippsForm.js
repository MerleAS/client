const VippsForm = ({
  setEmail,
  setName,
  setAddress,
  setAddress2,
  setCountry,
  setCity,
  setPostalCode,
  setPhone,
  vippsHandler,
  isLoading,
}) => {
  return (
    <div className="w-full space-y-8">
      <div className="w-full space-y-8 border border-gray-300 p-8">
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="Address line 2"
          onChange={(e) => setAddress2(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="Postal code"
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
        <input
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-[44.4px] border border-[#e6e6e6] rounded-[5px] pl-[0.75rem] shadow-sm flex placeholder-[#757680] placeholder-opacity-100 placeholder-text-base focus:outline-none focus:shadow-stripe focus:border-[#0573e180]"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={vippsHandler}
          disabled={isLoading}
          className="bg-black w-1/4 h-8 border border-black rounded-sm text-white"
        >
          Place order
        </button>
      </div>
    </div>
  );
};

export default VippsForm;
