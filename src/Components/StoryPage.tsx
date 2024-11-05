import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkmodeToggle from './DarkmodeToggle';
import '../CSS/StoryPage.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faBookmark, faHome } from '@fortawesome/free-solid-svg-icons';

interface ChapterData {
    chapterNo: number;
    chapterName: string;
    numberOfParagraphs: number;
    chapterParagraphs: string[];
    chapterURL: string;
    fileHash: string;
}

interface StoryPageProps {
    storyName: string;
    chapterData: ChapterData;
}

function StoryPage({ storyName, chapterData }: StoryPageProps) {
    const isDarkMode = localStorage.getItem('storydm') == 'true'
    const [isDark, setDark] = useState<boolean>(isDarkMode);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const contentsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [directories, setDirectories] = useState<any>(JSON.parse(localStorage.getItem('directories') || '{}'));

    const numberOfChapters = directories.chapters.length;
    const previousChapterURL = chapterData.chapterNo === 1 ? "/" : directories.chapters[chapterData.chapterNo - 2]["chapterURL"];
    const nextChapterURL = chapterData.chapterNo === numberOfChapters ? "/" : directories.chapters[chapterData.chapterNo]["chapterURL"];
    const chapters = directories.chapters
    useEffect(() => {
        const handleScroll = () => {
            if (contentsRef.current) {
                const scrollTop = contentsRef.current.scrollTop;
                const scrollHeight = contentsRef.current.scrollHeight;
                const clientHeight = contentsRef.current.clientHeight;

                // Calculate the scroll percentage
                const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
                setScrollProgress(scrollPercent);
            }
        };

        const contentsElement = contentsRef.current;
        if (contentsElement) {
            contentsElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentsElement) {
                contentsElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleBookmark = () => {
        const updatedDirectories = {
            ...directories,
            chapters: directories.chapters.map((chapter: any) => ({
                ...chapter,
                active: chapter.chapterNo === chapterData.chapterNo,
            })),
        };
        
        setDirectories(updatedDirectories);
        localStorage.setItem('directories', JSON.stringify(updatedDirectories));
    };

    return (
        <div className='story-page' data-theme={isDark ? 'dark' : 'light'}>
            <nav className={!isHidden ? "nav-bar" : "nav-bar hidden"}>
                <div className="navbar-container">
                    <div className="top-wrapper">
                        <div className="page-info">
                            <h1>{storyName}</h1>
                            <h4>Chapter {chapterData.chapterNo} - {chapterData.chapterName}</h4>
                        </div>
                        <div className="bookmark-btn-container">
                            <Button className='btn-primary' onClick={handleBookmark}>
                                <FontAwesomeIcon icon={faBookmark} className='btn-icon' />
                                <span>{chapters[chapterData.chapterNo - 1].active ? "Bookmarked" : "Add bookmark"}</span>
                            </Button>
                        </div>
                    </div>
                    <div className="bottom-wrapper">
                        <div className="progress-bar-container">
                            <div className="progress-bar-outer">
                                <div style={{ width: `${scrollProgress}%` }} className="progress-bar-inner"></div>
                            </div>
                        </div>
                        <div className="hide-btn-container">
                            <button 
                                className='hide-navbar-button'
                                onClick={() => setIsHidden(!isHidden)}
                            >
                                <FontAwesomeIcon icon={isHidden ? faChevronDown : faChevronUp} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="content-wrapper" ref={contentsRef} style={{ overflowY: 'scroll'}}>
                <div className="text">
                    {chapterData.chapterParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <div className="eye-level">
                    <h4>
                        This has intentionally been left blank to provide a consistent eye level
                    </h4>
                </div>
                <footer>
                    <div className="btn-wrapper">
                    <div className="nav-btns">
                        <Button 
                        className='btn-primary' 
                        id='previous-chapter-btn'
                        onClick={() => {navigate(`/${previousChapterURL}`)}} 
                        disabled={chapterData.chapterNo === 1}>
                            <FontAwesomeIcon icon={faChevronLeft} className='btn-icon' />
                            <span>Previous Chapter</span>
                        </Button>
                        
                        <Button 
                        className='btn-primary' 
                        id='home-btn'
                        onClick={() => {navigate('/')}} 
                        >
                            <FontAwesomeIcon icon={faHome} className='btn-icon' />
                            <span>Home</span>
                        </Button>

                        <Button className='btn-primary'
                         id='next-chapter-btn'
                         disabled={chapterData.chapterNo === numberOfChapters}
                         onClick={() => {navigate(`/${nextChapterURL}`)}} 
                         >
                            <span>Next Chapter</span>
                            <FontAwesomeIcon icon={faChevronRight} className='btn-icon' />

                        </Button>

                    </div>

                    </div>
                    <DarkmodeToggle 
                        isChecked={isDark}
                        handleChange={() => {setDark(!isDark); localStorage.setItem('storydm', !isDark ? 'true' : 'false')}}
                    />
                </footer>
            </div>
        </div>
    );
}

export default StoryPage;
