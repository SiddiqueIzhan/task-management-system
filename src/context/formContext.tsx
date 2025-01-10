import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useReducer,
} from "react";

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

type actionType =
  | { type: "TOGGLE_FILTER"; filterKey: string }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_SORT"; sort: string }
  | { type: "RESET_FILTERS" };

type initStateType = {
  selectedFilters: string[];
  searchQuery: string;
  selectedSort: string;
};

export type valuesType = {
  title: string;
  description: string;
  category: string;
  due_date: string;
  status: string;
};

const initialState: initStateType = {
  selectedFilters: [],
  searchQuery: "",
  selectedSort: "default",
};

const filterReducer = (state: initStateType, action: actionType) => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      const isAlreadySelected = state.selectedFilters.includes(
        action.filterKey
      );
      return {
        ...state,
        selectedFilters: isAlreadySelected
          ? state.selectedFilters.filter((key) => key !== action.filterKey)
          : [...state.selectedFilters, action.filterKey],
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };
    case "SET_SORT":
      return { ...state, selectedSort: action.sort };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
};

interface FormContextProps {
  optionsType: "task" | "status" | "category" | null;
  setOptionsType: React.Dispatch<
    React.SetStateAction<"task" | "status" | "category" | null>
  >;
  formEventType: "add" | "edit" | null;
  setFormEventType: React.Dispatch<React.SetStateAction<"add" | "edit" | null>>;
  showCalendar: "fill" | "filter" | null;
  setShowCalendar: React.Dispatch<
    React.SetStateAction<"fill" | "filter" | null>
  >;
  formRef: React.RefObject<HTMLDivElement>;
  popupRef: React.RefObject<HTMLDivElement>;
  taskData: valuesType[];
  setTaskData: React.Dispatch<React.SetStateAction<valuesType[]>>;
  state: initStateType;
  dispatch: React.Dispatch<any>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  valueDateFilter: Value;
  onChangeDateFilter: React.Dispatch<React.SetStateAction<Value>>;
  valueDateFill: Value;
  onChangeDateFill: React.Dispatch<React.SetStateAction<Value>>;
  handleShowPopUp: (
    index: number,
    popUpType: "task" | "status" | "category"
  ) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formEventType, setFormEventType] = useState<"add" | "edit" | null>(
    null
  );
  const [optionsType, setOptionsType] = useState<
    "task" | "status" | "category" | null
  >(null);
  const [showCalendar, setShowCalendar] = useState<"fill" | "filter" | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const formRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [valueDateFilter, onChangeDateFilter] = useState<Value>(new Date());
  const [valueDateFill, onChangeDateFill] = useState<Value>(new Date());
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [taskData, setTaskData] = useState<valuesType[]>([]);

  // Handle click outside for closing popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        // Do nothing if clicking inside popupRef
        return;
      }

      if (formRef.current && formRef.current.contains(event.target as Node)) {
        // Do nothing if clicking inside formRef
        return;
      }

      // Close all popups if clicking outside
      setShowCalendar(null);
      setOptionsType(null);
      setFormEventType(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, formRef]);

  useEffect(() => {
    let updatedData = [...taskData];

    // Apply selected filters
    state.selectedFilters.forEach((filterKey: string) => {
      if (filterKey === "work") {
        updatedData = updatedData.filter((item) => item.category === "work");
      } else if (filterKey === "personal") {
        updatedData = updatedData.filter(
          (item) => item.category === "personal"
        );
      } else if (filterKey === "due_date") {
        updatedData = updatedData.filter(
          (item) => item.due_date === "due_date"
        );
      }
    });

    // Apply search query
    if (state.searchQuery) {
      updatedData = updatedData.filter((item) => {
        return item.title
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
      });
    }

    setTaskData(updatedData);
  }, []);

  useEffect(() => {
    setShowCalendar(null);
  }, [valueDateFill, valueDateFilter]);

  // Handle showing/hiding specific popups
  const handleShowPopUp = (
    index: number,
    popUpType: "task" | "status" | "category"
  ) => {
    if (activeIndex === index && optionsType === popUpType) {
      // Toggle the same popup if already active
      setOptionsType(null);
    } else {
      // Show the new popup
      setActiveIndex(index);
      setOptionsType(popUpType);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formEventType,
        setFormEventType,
        formRef,
        popupRef,
        optionsType,
        setOptionsType,
        showCalendar,
        setShowCalendar,
        activeIndex,
        setActiveIndex,
        handleShowPopUp,
        taskData,
        setTaskData,
        state,
        dispatch,
        valueDateFilter,
        onChangeDateFilter,
        valueDateFill,
        onChangeDateFill,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
