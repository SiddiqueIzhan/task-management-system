import React from "react";
import { ToggleData } from "../data";
import styles from "./Tabs.module.scss";

interface TabsProps {
  activeType: string;
  handleactiveType: (type: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeType, handleactiveType }) => {
  return (
    <div className={styles.toggleContainer}>
      {ToggleData.map(({ type, icon }, index) => (
        <div
          key={index}
          className={`${styles.toggleOption} ${
            activeType === type ? styles.active : ""
          }`}
          onClick={() => handleactiveType(type)}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.type}>{type}</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
