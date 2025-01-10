import { optionsType } from "../data";
import FormPopUp from "../FormPopUp";
import { useFormContext, ValuePiece } from "../../context/formContext";
import Calendar from "react-calendar";

interface OptionsPopUpProps {
  options?: optionsType[];
  className?: string;
  rowIndex?: number;
  handleDeleteTask?: (taskId: number) => Promise<void>;
  calType?: string;
  value?: ValuePiece | undefined;
}

const OptionsPopUp: React.FC<OptionsPopUpProps> = ({
  options,
  className,
  rowIndex = 0,
  handleDeleteTask,
  calType,
  value,
}) => {
  const {
    formEventType,
    setFormEventType,
    formRef,
    popupRef,
    showCalendar,
    onChangeDateFill,
    onChangeDateFilter,
  } = useFormContext();

  const handleEventType = async (opt: string, rowIndex?: number) => {
    if (opt === "Edit") {
      // handleEditTask(rowIndex);
      setFormEventType("edit");
    } else if (opt === "Delete" && rowIndex !== undefined && handleDeleteTask) {
      try {
        await handleDeleteTask(rowIndex);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const updateDate = (value: ValuePiece) => {
    if (value !== null) {
      console.log(calType, value);
      if (calType === "fill") {
        onChangeDateFill(value);
      } else if (calType === "filter") {
        onChangeDateFilter(value);
      }
    }
  };

  return (
    <div
      className={`bg-[#FFF9F9] p-3 rounded-xl border border-[#7B198426] shadow-sm absolute z-10 flex flex-col font-semibold  ${className} ${
        showCalendar && "bg-black p-0.5 border-2"
      }`}
      ref={popupRef}
    >
      {showCalendar === calType ? (
        <Calendar
          onChange={(date) => {
            date !== null && updateDate(date as Date);
          }}
        />
      ) : (
        <>
          {options?.map((option, index) => {
            const IconComponent = option.icon; // Use the icon component
            return (
              <span
                key={index}
                className={
                  option.opt === "Delete"
                    ? "text-red-500"
                    : " hover:cursor-pointer"
                }
                style={{ background: "transperant" }}
                onClick={() => handleEventType(option.opt, rowIndex)}
              >
                {IconComponent && <IconComponent className="inline mr-2" />}

                {option.opt}
              </span>
            );
          })}
          {formEventType === "edit" && (
            <FormPopUp
              eventType={formEventType}
              setFormPopUp={setFormEventType}
              formRef={formRef}
              value={value as ValuePiece}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OptionsPopUp;
