// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage'; // Import your HomePage component
import NotFound from './Components/NotFound';
import StoryPage from './Components/StoryPage';
import chapterDataJson from './assets/data.json'; // Adjust the path to your JSON file
import directories from './assets/directory.json'

async function computeHash(jsonObject: object): Promise<string> {
  const jsonString = JSON.stringify(jsonObject);
  const encoder = new TextEncoder();
  const data = encoder.encode(jsonString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

interface ChapterData {
    chapterNo: number;
    chapterName: string;
    numberOfParagraphs: number;
    chapterParagraphs: string[];
    fileHash: string;
    chapterURL: string;
}

// Type the imported data to match the JSON structure
const chapterData = chapterDataJson as { story: string; numberOfChapters: number; chapters: ChapterData[] };

const App: React.FC = () => {
  useEffect(() => {
    const storedData = localStorage.getItem('directories');
    const storedDataJson = storedData ? JSON.parse(storedData) : null;

    // Compute hash of current directories.json
    const currentHash = computeHash(directories);

    if (!storedData || storedDataJson.hash !== currentHash) {
        // Update local storage if the hash is different or if data is missing
        const updatedDirectories = {
            ...directories,
            hash: currentHash,
            chapters: directories.chapters.map((chapter: any) => ({
                ...chapter,
                active: storedDataJson?.chapters.find(
                    (storedChapter: any) => storedChapter.chapterNo === chapter.chapterNo
                )?.active || false,
            })),
        };
        localStorage.setItem('directories', JSON.stringify(updatedDirectories));
    }
}, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route for HomePage */}
        
        {/* Dynamically create a route for each chapter */}
        {chapterData.chapters.map((chapter) => (
          <Route
            key={chapter.chapterNo}
            path={`/${chapter.chapterURL}`}
            element={<StoryPage storyName={chapterData.story} chapterData={chapter} />}
          />
        ))}

        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
};

export default App;
