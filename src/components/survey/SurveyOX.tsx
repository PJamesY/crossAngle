import React from "react";

interface SurveyOXProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

function SurveyOX({ selected, setSelected }: SurveyOXProps) {
  const changeYesNoOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.id);
  };

  return (
    <div className="option">
      <label htmlFor="yes">
        <input
          type="radio"
          id="yes"
          name="option"
          checked={selected === "yes"}
          onChange={changeYesNoOption}
        />
        O
      </label>
      <label htmlFor="no">
        <input
          type="radio"
          id="no"
          name="option"
          checked={selected === "no"}
          onChange={changeYesNoOption}
        />
        X
      </label>
    </div>
  );
}

export default SurveyOX;
