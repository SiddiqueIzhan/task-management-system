import { User } from "firebase/auth";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";
import { cardDetails, listColumns } from "../components/data";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface userPageProps {
  user: User;
}

const TaskPage: React.FC<userPageProps> = ({ user }) => {
  const [activeType, setactiveType] = useState("List");
  const handleactiveType = (type: string) => {
    setactiveType(type);
  };
  return (
    <div className="page">
      <Header
        user={user}
        activeType={activeType}
        handleactiveType={handleactiveType}
      />
      <div className="mt-20 md:mt-[34px]">
        {activeType === "List" && (
          <div className="w-full border-t display-grid p-[10px]">
            {listColumns.map((column, index) => (
              <span key={index} className="text-sm font-bold text-[#00000099] ">
                {column.label}
              </span>
            ))}
          </div>
        )}

        <div
          className={`flex gap-5 md:gap-8 ${
            activeType === "Board" ? "flex-row" : "flex-col"
          }`}
        >
          {cardDetails.map((cardItem, cardIndex) => (
            <CardContainer
              cardItem={cardItem}
              key={cardIndex}
              activeType={activeType}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskPage;
