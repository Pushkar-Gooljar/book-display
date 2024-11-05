import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/DarkmodeToggle.css';
import '../CSS/ChapterAccordion.css';
import { ChangeEvent } from 'react';

interface DarkmodeToggleProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const DarkmodeToggle: React.FC<DarkmodeToggleProps> = ({ handleChange, isChecked }) => {
  return (
    <div className="form-check form-switch toggle-container">
      <input 
        className="form-check-input dark-mode-toggle"
        type="checkbox"
        role="switch"
        id="check"
        onChange={handleChange}
        checked={isChecked}
      />
      <label className="form-check-label" htmlFor="check">
        Dark Mode
      </label>
    </div>
  );
};

export default DarkmodeToggle;
