import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  
  const { name, spots, setDay, selected } = props;
  
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });


  function formatSpots(spots) {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>
    } else {
      return <h3 className="text--light">{spots} spots remaining</h3>
    }
  }

   
  return (
    <li 
      className={dayClass}
      onClick={() => setDay(name)}
      data-testid="day"
      >
      <h2 className="text--regular">
        {name}
      </h2>
      <div className="text--light">
        {formatSpots(spots)}
      </div>
    </li>
  );
}