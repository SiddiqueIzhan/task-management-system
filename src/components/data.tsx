import { IconType } from "react-icons";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeveloperBoard } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TfiViewList } from "react-icons/tfi";

export const ToggleData = [
  {
    type: "List",
    icon: <TfiViewList />,
  },
  {
    type: "Board",
    icon: <MdDeveloperBoard />,
  },
];

export const taskOptions: optionsType[] = [
  {
    icon: BiSolidEditAlt,
    opt: "Edit",
  },
  {
    icon: RiDeleteBin5Fill,
    opt: "Delete",
  },
];

export interface listColumnsType {
  label: string;
  dataField: string;
}

export const listColumns: listColumnsType[] = [
  {
    label: "Task Name",
    dataField: "title",
  },
  {
    label: "Due on",
    dataField: "due_date",
  },
  {
    label: "Task Status",
    dataField: "status",
  },
  {
    label: "Category",
    dataField: "category",
  },
];

export const tasksData: tasksDataType[] = [
  {
    id: 1,
    task: "Interview with Design Team",
    due_date: "Today",
    status: "TO-DO",
    category: "Work",
  },
  {
    id: 2,
    task: "Team Meeting",
    due_date: "30 Dec, 2024",
    status: "TO-DO",
    category: "Personal",
  },
  {
    id: 3,
    task: "Design a Dashboard page along with wireframes ",
    due_date: "31 Dec, 2024",
    status: "TO-DO",
    category: "Work",
  },
  {
    id: 4,
    task: "Morning Workout",
    due_date: "Today",
    status: "IN-PROGRESS",
    category: "Work",
  },
  {
    id: 5,
    task: "Code Review",
    due_date: "Today",
    status: "IN-PROGRESS",
    category: "Personal",
  },
  {
    id: 6,
    task: "Update Task Tracker",
    due_date: "25 Dec, 2024",
    status: "IN-PROGRESS",
    category: "Work",
  },
  {
    id: 7,
    task: "Submit Project Proposal",
    due_date: "Today",
    status: "COMPLETED",
    category: "Work",
  },
  {
    id: 8,
    task: "Birthday Gift Shopping",
    due_date: "Today",
    status: "COMPLETED",
    category: "Personal",
  },
  {
    id: 9,
    task: "Client Presentation",
    due_date: "25 Dec, 2024",
    status: "COMPLETED",
    category: "Work",
  },
];

export interface tasksDataType {
  [key: string]: string | number;
}

export interface optionsType {
  icon?: IconType;
  opt: string;
}

export const statusOptions: optionsType[] = [
  {
    opt: "TO-DO",
  },
  {
    opt: "IN-PROGRESS",
  },
  {
    opt: "COMPLETED",
  },
];

export const categoryOptions: optionsType[] = [
  {
    opt: "WORK",
  },
  {
    opt: "PERSONAL",
  },
];

export const activityData = [
  {
    activity: "You created this task",
    date: "Dec 27 at 1:15 pm",
  },
  {
    activity: "You changed status from in progress to complete",
    date: "Dec 28 at 1:15 pm",
  },
  {
    activity: "You uploaded file",
    date: "Dec 29 at 1:15 pm",
  },
];

export interface cardItemType {
  title: string;
  status: string;
  emptyPlaceHolder: string;
}

export const cardDetails: cardItemType[] = [
  {
    title: "Todo",
    status: "TO-DO",
    emptyPlaceHolder: "No Tasks in To-Do",
  },
  {
    title: "In Progress",
    status: "IN-PROGRESS",
    emptyPlaceHolder: "No Tasks In Progress",
  },
  {
    title: "Completed",
    status: "COMPLETED",
    emptyPlaceHolder: "No Completed Tasks",
  },
];
