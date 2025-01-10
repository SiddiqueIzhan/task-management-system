import { IoMdClose } from "react-icons/io";
import styles from "./FormPopUp.module.scss";
import { useFormik } from "formik";
import { RiBold } from "react-icons/ri";
import { TbItalic } from "react-icons/tb";
import { RiStrikethrough } from "react-icons/ri";
import { RiListOrdered2 } from "react-icons/ri";
import { RiListUnordered } from "react-icons/ri";
import { activityData } from "../data";
import { ValidationSchema } from "../../schemas";
import { get, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { ValuePiece, valuesType } from "../../context/formContext";
import { useState } from "react";
import { db } from "../../config/firebase";

interface FormPopUpProps {
  eventType: string;
  setFormPopUp: React.Dispatch<React.SetStateAction<"add" | "edit" | null>>;
  formRef: React.RefObject<HTMLDivElement>;
  value: ValuePiece;
}

interface FileData {
  name: string;
  preview: string;
}

const FormPopUp: React.FC<FormPopUpProps> = ({
  eventType,
  setFormPopUp,
  formRef,
  value,
}) => {
  const initialValues: valuesType = {
    title: "",
    description: "",
    category: "",
    due_date: value ? value.toISOString().split("T")[0] : "",
    status: "",
  };

  const [attachments, setAttachments] = useState<FileData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newAttachments: FileData[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const preview = e.target?.result as string;
          newAttachments.push({
            name: file.name,
            preview: preview,
          });

          // Update state after processing all files
          if (newAttachments.length === files.length) {
            setAttachments((prev) => [...prev, ...newAttachments]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddTask = async (newTask: valuesType) => {
    try {
      const dbRef = ref(db, "/main/tasks");
      console.log(newTask);
      // Fetch existing data once
      const snapshot = await get(dbRef);
      const existingData = snapshot.val() || []; // Default to an empty array if no data exists

      let updatedData: valuesType[] = [];
      if (existingData.length === 0) {
        updatedData = existingData?.push(newTask);
      } else {
        updatedData = existingData?.push([
          ...existingData,
          { ...newTask, attachments: attachments },
        ]);
      }
      // Update the data

      // Write the updated data to the database
      await update(ref(db, "/main"), { tasks: updatedData });

      setFormPopUp(null);
      toast.success("Task Added Successfully");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ValidationSchema,
      onSubmit: (values, action) => {
        handleAddTask(values);
        action.resetForm();
      },
    });

  const getStyleClass = (eventType: string) => {
    if (eventType === "add") {
      return "h-4/5 md:w-1/2 md:h-5/6";
    } else if (eventType === "edit") {
      return "h-5/6 md:w-3/5 md:h-3/4";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={"black-overlay"}>
        <div
          className={`${styles.modal} ${getStyleClass(eventType)}`}
          ref={formRef}
        >
          <div className={styles.modalHeader}>
            <h1>{eventType === "add" && "Create Task"}</h1>
            <IoMdClose
              className={styles.closeIcon}
              onClick={() => setFormPopUp(null)}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row overflow-scroll">
              <div
                className={`${styles.formSection} ${
                  eventType === "add" ? "w-full" : "md:w-3/5"
                }`}
              >
                <div
                  className={`${styles.inputSection} ${
                    errors.title && touched.title && `${styles.error}`
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Task title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={`${errors.title && "border border-red-600"}`}
                  />
                </div>
                {errors.title && touched.title && (
                  <p className="text-[10px] text-red-600">{errors.title}</p>
                )}
                <div
                  className={`${styles.inputSection} ${
                    errors.description &&
                    touched.description &&
                    `${styles.error}`
                  }`}
                >
                  <div className={styles.top}>
                    <textarea
                      name="description"
                      id="description"
                      placeholder={`Description`}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <div className={styles.bottom}>
                      <div className={styles.textEditOptions}>
                        <RiBold />
                        <TbItalic />
                        <RiStrikethrough />
                        <hr />
                        <RiListOrdered2 />
                        <RiListUnordered />
                      </div>
                      <span>0/300 characters</span>
                    </div>
                  </div>
                </div>
                {errors.description && touched.description && (
                  <p className="text-[10px] text-red-600">
                    {errors.description}
                  </p>
                )}
                <div className={styles.requiredFields}>
                  <div className={styles.subSection}>
                    <label>Task Category*</label>
                    <div className={styles.categoryOptions}>
                      <span
                        className={`${
                          values.category === "Work"
                            ? styles.activeCategory
                            : ""
                        }`}
                        onClick={() =>
                          handleChange({
                            target: { name: "category", value: "Work" },
                          })
                        }
                      >
                        Work
                      </span>
                      <span
                        className={`${
                          values.category === "Personal"
                            ? styles.activeCategory
                            : ""
                        }`}
                        onClick={() =>
                          handleChange({
                            target: { name: "category", value: "Personal" },
                          })
                        }
                      >
                        Personal
                      </span>
                    </div>
                    {errors.category && touched.category && (
                      <p className="text-[10px] text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className={styles.subSection}>
                    <label>Due on*</label>
                    <div
                      className={`${styles.inputSection} ${
                        errors.due_date && touched.due_date && `${styles.error}`
                      }`}
                    >
                      <input
                        type="date"
                        name="due_date"
                        className=""
                        value={values.due_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.due_date && touched.due_date && (
                      <p className="text-[10px] text-red-600">
                        {errors.due_date}
                      </p>
                    )}
                  </div>
                  <div className={styles.subSection}>
                    <label>Task Status*</label>
                    <div
                      className={`${styles.inputSection} ${
                        errors.status && touched.status && `${styles.error}`
                      }`}
                    >
                      <select
                        name="status"
                        className=""
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Choose</option>
                        <option value="TO-DO">TO-DO</option>
                        <option value="IN-PROGRESS">IN-PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>
                    {errors.status && touched.status && (
                      <p className="text-[10px] text-red-600">
                        {errors.status}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.attachmentSection}>
                  <label>Attachment</label>
                  <div className={styles.inputSection}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className={styles.message}>
                      <span>Drop your files here or </span>
                      <span className="text-blue-500 cursor-pointer">
                        Upload
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {eventType === "edit" && (
                <div className={styles.activitySection}>
                  <div className={styles.header}>
                    <h1>Activity</h1>
                  </div>
                  {activityData.map((elem, index) => {
                    return (
                      <div key={index} className={styles.activity}>
                        <span>{elem.activity}</span>
                        <span>{elem.date}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={styles.buttonSection}>
              <button type="button" onClick={() => setFormPopUp(null)}>
                CANCEL
              </button>
              <button type="submit">
                {eventType === "edit" ? "UPDATE" : "CREATE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPopUp;
