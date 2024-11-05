// CircularProgressBar.tsx
import React from "react";
import "../CSS/ReadingProgressBar.css";

interface CircularProgressBarProps {
  size?: number;
  progress: number; // Progress prop with number type
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = 30,
  progress,
  strokeWidth = 5,
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="circular-progress" width={size} height={size}>
      <circle
        className="circular-progress-bg"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="circular-progress-bar"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        className="circular-progress-text"
        x="50%"
        y="50%"
        dy=".3em"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
