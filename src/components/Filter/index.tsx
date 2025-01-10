import { FaAngleDown } from "react-icons/fa6";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { categoryOptions } from "../data";
import { useFormContext } from "../../context/formContext";

const FilterOptions = () => {
  const {
    setOptionsType,
    optionsType,
    showCalendar,
    setShowCalendar,
    valueDateFilter,
  } = useFormContext();
  return (
    <div className="w-full flex items-start md:items-center gap-2 md:gap-[10px] flex-col md:flex-row ">
      <span className="text-xs text-[#00000099]">Filter By: </span>
      <div className="item-center gap-[10px] relative">
        <span
          className="px-2 py-[6.5px] rounded-[60px] border border-[#00000033] item-center gap-1 text-[#00000099] text-sm relative"
          onClick={() => setOptionsType("category")}
        >
          {optionsType === "category" && (
            <OptionsPopUp
              options={categoryOptions}
              className={"absolute top-10 right-0 gap-[13px]"}
              value={valueDateFilter as Date | null | undefined}
            />
          )}
          <span>Category</span>
          <FaAngleDown className={optionsType ? "rotate-180" : ""} />
        </span>
        <span
          className="px-2 py-[6.5px] rounded-[60px] border border-[#00000033] item-center gap-1 text-[#00000099] text-sm"
          onClick={() => setShowCalendar("filter")}
        >
          <span>
            {valueDateFilter
              ? valueDateFilter.toLocaleString().slice(0, 10)
              : "Due Date"}
          </span>
          <FaAngleDown className={showCalendar ? "rotate-180" : ""} />
        </span>
        {showCalendar === "filter" && <OptionsPopUp calType="filter" />}
      </div>
    </div>
  );
};

export default FilterOptions;
