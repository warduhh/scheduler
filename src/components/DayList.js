import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const { days, value, onChange } = props;

  const renderDays = days.map(day => {
    const { id, name, spots } = day;

    return (
      <DayListItem 
        key={id}
        name={name}
        spots={spots}
        day={value}
        setDay={() => onChange(name)}
        selected={value === name ? true : false}
      />
    )
  })

  return(
    <ul>
      {renderDays}
    </ul>
  )
}
