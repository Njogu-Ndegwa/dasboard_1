import React from "react";
import { Icon } from "antd";
import "../css/patient_context_menu.css";

const Popup = ({ record, visible, x, y }) =>
  visible && (
      
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li>
        <Icon type="user" />
        {record.name}
      </li>
      <li>
        <Icon type="heart-o" />
        Like it
      </li>
      <li>
        <Icon type="star-o" />
        Bookmark
      </li>
    </ul>
  );

export default Popup;
