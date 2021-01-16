import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import styles from "./BasicFunction.module.css";

export const BasicFunction = (props) => {
   const [state, setState] = useState([
      { id: 1, name: "shrek" },
      { id: 2, name: "fiona" },
      { id: 3, name: "abavav" },
      { id: 4, name: "cccccccc" },
      { id: 5, name: "ddddddd" },
   ]);

   return (
      <ReactSortable
         tag="div"
         style={{ display: "flex", gap: "20px", flexWrap: "wrap", width: "800px" }}
         handle={`.${styles.itemHeader}`}
         animation={500}
         list={state}
         setList={setState}
      >
         {state.map((item) => (
            <div key={item.id} className={styles.item}>
               <div className={styles.itemHeader}>{item.name}</div>
               <div>{item.name}</div>
               <div>{item.name}</div>
            </div>
         ))}
      </ReactSortable>
   );
};
