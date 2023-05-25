import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  //day=value setDay=onChange
  const { days, value, onChange } = props;

  const dayListItems = days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul> {dayListItems}
  </ul>
}
