import React from "react";

interface DateInputProps {
  type: string;
  date: string;
  dateStart: string;
  dateEnd: string;
  mode: string;
  centuries: { label: string; startYear: number; endYear: number }[];
  selectedCentury: { startYear: number; endYear: number };
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCenturyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  type,
  date,
  dateStart,
  dateEnd,
  mode,
  centuries,
  selectedCentury,
  handleDateChange,
  handleModeChange,
  handleCenturyChange,
  handleDateStartChange,
  handleDateEndChange,
}) => {
  return (
    <div>
      <input
        type="date"
        placeholder={`Date de ${type}`}
        value={date || ""}
        onChange={handleDateChange}
        className="search-input"
      />
      <div className="custom-dates-research">
        <div className="date-selection">
          <label>Sélection des dates</label>
          <select onChange={handleModeChange} className="mode-select">
            <option value="discretionary">Libre</option>
            <option value="century">Par siècle</option>
          </select>
        </div>
        <div className="coucou-dates">
          {!date && mode === "century" && (
            <div className="range-container-date">
              <div className="select-siècle">
                <label>Choisir un siècle</label>
                <select onChange={handleCenturyChange} className="century-select">
                  <option value=""></option>
                  {centuries.map((century, index) => (
                    <option key={index} value={index}>
                      {century.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="range-années">
                <label>{`${type} entre`}</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={dateStart || ""}
                  onChange={handleDateStartChange}
                  className="search-input-range-date"
                />
                <span>{dateStart}</span>
              </div>
              <div className="range-années">
                <label>et</label>
                <input
                  type="range"
                  min={selectedCentury.startYear}
                  max={selectedCentury.endYear}
                  value={dateEnd || ""}
                  onChange={handleDateEndChange}
                  className="search-input-range-date"
                />
                <span>{dateEnd}</span>
              </div>
            </div>
          )}
          {!date && mode === "discretionary" && (
            <div className="range-container-date">
              <div className="bornes-dates">
                <label>{`${type} entre`}</label>
                <input
                  type="number"
                  min="0000"
                  max={new Date().getFullYear()}
                  value={dateStart || ""}
                  onChange={handleDateStartChange}
                  className="search-input-range-date"
                />
                <label>et</label>
                <input
                  type="number"
                  min="0000"
                  max={new Date().getFullYear()}
                  value={dateEnd || ""}
                  onChange={handleDateEndChange}
                  className="search-input-range-date"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateInput;