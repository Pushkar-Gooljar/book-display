import { useState } from 'react';
import ChapterAccordion from './ChapterAccordion';
import DarkmodeToggle from './DarkmodeToggle';
import '../CSS/HomePage.css'

function HomePage() {
  const isDarkMode = localStorage.getItem('storydm') == 'true'
  const [isDark, setDark] = useState<boolean>(isDarkMode);
const chapterDirectories = JSON.parse(localStorage.getItem('directories') || '{}');
  const chapters = chapterDirectories.chapters


  return (
    <div className='home-page' data-theme={ isDark ? "dark" : "light"}>
      <div className="chapter-selection">
        <h1>Chapters</h1>
        <ChapterAccordion chapters={chapters}/>
      </div>
      <div className="controls">
      <DarkmodeToggle 
        isChecked={isDark}
        handleChange={() => {setDark(!isDark); localStorage.setItem('storydm', !isDark ? 'true' : 'false')}}
        />
      </div>
    </div>
  );
}

export default HomePage
