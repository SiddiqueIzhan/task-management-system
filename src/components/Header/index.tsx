import { signOut, User } from "firebase/auth";
import { auth } from "../../pages/login";
import { PiNotepad } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import Toggle from "../Tabs";
import { IoIosSearch } from "react-icons/io";
import FormPopUp from "../FormPopUp";
import { useFormContext } from "../../context/formContext";
import "react-calendar/dist/Calendar.css";
import FilterOptions from "../Filter";

interface headerProps {
  user: User;
  activeType: string;
  handleactiveType: (type: string) => void;
}

const Header: React.FC<headerProps> = ({
  user,
  activeType,
  handleactiveType,
}) => {
  const {
    formEventType,
    setFormEventType,
    formRef,
    state,
    dispatch,
    valueDateFill,
  } = useFormContext();

  return (
    <>
      <div className="w-full h-[54px] md:h-20 flex justify-between mx-auto bg-[#FAEEFC] md:bg-transparent absolute top-0 right-0 md:relative items-center px-4 py-3 md:p-0">
        <div className="flex flex-col justify-between items-start md:gap-6">
          <div className="item-center gap-1 text-[#2F2F2F]">
            <PiNotepad className="hidden md:inline text-3xl" />
            <h3 className="text-base font-semibold md:font-bold md:text-2xl">
              TaskBuddy
            </h3>
          </div>
          <Toggle activeType={activeType} handleactiveType={handleactiveType} />
        </div>

        <div className="flex flex-col justify-between items-end md:gap-[5px]">
          <span className="item-center gap-2">
            <img
              src={user.photoURL as string}
              alt="profile-img"
              className="w-6 md:w-9 rounded-full"
            />
            <h1 className="hidden md:inline font-bold text-base text-[#00000099]">
              {user.displayName}
            </h1>
          </span>
          <button
            className="hidden w-[108px] h-10 md:flex items-center gap-2 bg-[#FFF9F9] rounded-xl border border-[#7B198426] px-[10px] hover:bg-black hover:text-white duration-500"
            onClick={() => signOut(auth)}
          >
            <BiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="w-full mt-[90px] h-12 flex flex-col gap-[17px] md:flex-row justify-between mx-auto md:mt-[14px] relative">
        <div>
          <FilterOptions />
        </div>

        <div className="item-center gap-5">
          <div className="w-full md:w-[204px] h-9 border border-[#0000006B] item-center rounded-[60px] gap-1 p-2">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search"
              className="text-sm outline-none bg-transparent w-11/12"
              value={state.searchQuery}
              onChange={(e) =>
                dispatch({
                  type: "SET_SEARCH_QUERY",
                  query: e.target.value,
                })
              }
            />
          </div>
          <button
            className="w-[86px] h-8 md:w-[152px] md:h-12 rounded-[40px] bg-[#7B1984] item-center justify-center text-white text-[10px] md:text-sm font-bold absolute right-0 -top-10 md:relative md:top-0"
            onClick={() => setFormEventType("add")}
          >
            ADD TASK
          </button>
          {formEventType === "add" && (
            <FormPopUp
              eventType={formEventType}
              setFormPopUp={setFormEventType}
              formRef={formRef}
              value={valueDateFill as Date}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
