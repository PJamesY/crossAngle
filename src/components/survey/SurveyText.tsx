interface SurveyTextProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function SurveyText({ text, setText }: SurveyTextProps) {
  const handleSurveyTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  return (
    <input
      value={text}
      aria-label="survey-input"
      onChange={handleSurveyTextChange}
    />
  );
}

export default SurveyText;
