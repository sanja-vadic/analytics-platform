import { Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../common/commonSlice";
import { DARK_THEME, LIGHT_THEME } from "../../constants/constants";
import styles from "./ThemeSelect.module.css";

const ThemeSelect = ({ defaultValue = LIGHT_THEME, style, className, bordered = false }) => {
   const dispatch = useDispatch();

   const changeRelativeRange = (value, event) => {
      dispatch(changeTheme(value));
   };

   return (
      <Select
         defaultValue={defaultValue}
         bordered={bordered}
         onChange={(value, event) => changeRelativeRange(value, event)}
         className={[className, styles.themelSelect]}
         style={style}
      >
         <Select.Option value={LIGHT_THEME}>Light</Select.Option>
         <Select.Option value={DARK_THEME}>Dark</Select.Option>
      </Select>
   );
};

export default ThemeSelect;
