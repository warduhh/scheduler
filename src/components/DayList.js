import React from "react";
import "components/DayListItem";
import DayListItem from "components/DayListItem";

// create a <DayList> component that will hold multiple days.
export default function
  DayList(props) {
  const { days, day, setDay } =
  props;

  const dayListItems =
    days.map((dayObj) => {
      return (
        <DayListItem
          key={dayObj.id}
          name={dayObj.name}
          spots={dayObj.spots}
          selected={dayObj.name === day}
          setDay={setDay}
        />
      );
    });


  return <ul> {dayListItems}
  </ul>
}

