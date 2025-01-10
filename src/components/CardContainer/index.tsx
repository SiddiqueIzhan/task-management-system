import React, { useEffect, useState } from "react";
import {
  cardItemType,
  listColumns,
  listColumnsType,
  statusOptions,
  taskOptions,
  tasksDataType,
} from "../data";
import styles from "./CardContainer.module.scss"; // Import the SASS styles
import { SlOptions } from "react-icons/sl";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { FaAngleDown } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi";
import { useFormContext } from "../../context/formContext";
import { IoMdAdd } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import { FaArrowTurnDown } from "react-icons/fa6";
import { child, onValue, ref } from "firebase/database";
import { remove } from "firebase/database"; // Adjust the path to your Firebase config
import { db } from "../../config/firebase";

interface CardContainerProps {
  cardItem: cardItemType;
  activeType: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  cardItem,
  activeType,
}) => {
  const [hideList, setHideList] = useState(false);
  const [showAddTaskBar, setShowAddTaskbar] = useState(false);
  const [count, setCount] = useState(0);
  const {
    optionsType,
    setOptionsType,
    activeIndex,
    handleShowPopUp,
    setShowCalendar,
    taskData,
    setTaskData,
  } = useFormContext();

  useEffect(() => {
    onValue(child(ref(db), "/main/tasks"), (snapshot) =>
      setTaskData(snapshot.val())
    );
    console.log(taskData);
  }, []);

  const handleDeleteTask = async (taskId: number) => {
    const taskRef = ref(db, `/main/tasks/${taskId}`); // Reference to the specific task

    try {
      // Check if the task exists
      const dbRef = ref(db, "/main/tasks");
      onValue(
        dbRef,
        (snapshot) => {
          const existingData = snapshot.val() || [];
          if (existingData[taskId]) {
            // If the task exists, delete it
            remove(taskRef)
              .then(() => {
                console.log(`Task with ID ${taskId} deleted successfully.`);
              })
              .catch((error) => {
                console.error("Error deleting task:", error);
              });
          } else {
            console.warn(`Task with ID ${taskId} not found.`);
          }
        },
        { onlyOnce: true }
      );
    } catch (error) {
      console.error("Error handling delete operation:", error);
    }
  };

  useEffect(() => {
    setCount(
      taskData?.filter((item) => cardItem.status === item.status).length
    );
  }, []);

  return (
    <div
      className={`${styles.parent} ${hideList && styles.hideCard} ${
        activeType === "Board" && styles.boardParent
      }`}
    >
      <div
        className={`${styles.status} ${
          activeType === "Board" ? styles.boardStatus : styles.listStatus
        }`}
      >
        <span>
          {activeType === "List"
            ? `${cardItem.title} (${count})`
            : cardItem.status}
        </span>
        <FaAngleDown
          className={`${styles.arrow} ${hideList ? "rotate-180" : "rotate-0"}`}
          onClick={() => setHideList(!hideList)}
        />
      </div>
      <div
        className={`${styles.cardContainer} ${
          activeType === "Board"
            ? `${styles.board}`
            : `${styles.list} ${hideList ? `${styles.hideList}` : ``}`
        }`}
      >
        {cardItem.status === "TO-DO" && activeType === "List" && (
          <>
            <div className={styles.addTaskItem}>
              <div className={styles.taskColumn}>
                <span
                  className="flex items-center"
                  onClick={() => setShowAddTaskbar(!showAddTaskBar)}
                >
                  <IoMdAdd className="text-[#7B1984] mr-1" />
                  ADD TASK
                </span>
              </div>
            </div>
            {showAddTaskBar && (
              <div className={styles.addTaskItem}>
                <div className={styles.taskColumn}>
                  <span>Task Title</span>
                </div>
                <div className={styles.taskColumn}>
                  <span onClick={() => setShowCalendar("fill")}>
                    <LuCalendarRange />
                    Add date
                  </span>
                </div>
                <div className={styles.taskColumn}>
                  <span onClick={() => setOptionsType("status")}>
                    <IoMdAdd />
                  </span>
                </div>
                <div className={styles.taskColumn}>
                  <span onClick={() => setOptionsType("category")}>
                    <IoMdAdd />
                  </span>
                </div>
                <div className="block ml-[77px]">
                  <div className="flex items-center gap-[10px]">
                    <span className="w-[84px] px-3 py-1 rounded-[60px] bg-[#7B1984] text-white text-center font-bold flex items-center gap-2">
                      ADD
                      <FaArrowTurnDown className="text-[#FFFFFFCC] rotate-90 inline" />
                    </span>
                    <span className="w-[84px] px-3 py-1 rounded-[60px] bg-transparent text-black text-center font-bold">
                      CANCEL
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {taskData.length === 0 ? (
          <span className={styles.noTasks}>{cardItem.emptyPlaceHolder}</span>
        ) : (
          <>
            {taskData.length &&
              taskData?.map((item: tasksDataType, rowindex) => {
                return (
                  cardItem.status === item.status && (
                    <div
                      key={rowindex}
                      className={`${styles.taskItem} ${
                        activeType === "Board" ? styles.boardTask : ""
                      }`}
                    >
                      {listColumns.map((column: listColumnsType, colIndex) => (
                        <span
                          key={colIndex}
                          className={`${styles.taskColumn} ${
                            activeType === "Board" ? styles.boardColumn : ""
                          }`}
                        >
                          {colIndex === 0 && activeType === "List" && (
                            <span className="item-center gap-2">
                              <input
                                type="checkbox"
                                name="select_task"
                                className={styles.checkbox}
                              />
                              <HiCheckCircle className={styles.check} />
                            </span>
                          )}
                          <span
                            onClick={() =>
                              colIndex === 2 &&
                              handleShowPopUp(rowindex, "status")
                            }
                          >
                            {item[column.dataField]}
                          </span>
                          {rowindex === activeIndex &&
                            optionsType === "status" &&
                            colIndex === 2 && (
                              <OptionsPopUp
                                options={statusOptions}
                                className={styles.statusOptions}
                              />
                            )}
                        </span>
                      ))}
                      <SlOptions
                        className={styles.options}
                        onClick={() => handleShowPopUp(rowindex, "task")}
                      />
                      {rowindex === activeIndex && optionsType === "task" && (
                        <OptionsPopUp
                          options={taskOptions}
                          className={styles.taskOptions}
                          rowIndex={rowindex}
                          handleDeleteTask={handleDeleteTask}
                        />
                      )}
                    </div>
                  )
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
