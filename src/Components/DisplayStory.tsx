import { useState, useEffect, useRef } from 'react';
import DarkmodeToggle from './DarkmodeToggle';
import '../CSS/DisplayStory.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function DisplayStory() {
    const [isDark, setDark] = useState(false);
    const [isHidden, setHidden] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [bookmarkedParagraph, setBookmarkedParagraph] = useState();
    const contentsRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className='story-page' data-theme={isDark ? 'dark' : 'light'}>
            <nav className={!isHidden ? 'story-nav' : 'story-nav hidden'}>
                <div className="top-wrapper">
                    <div className="page-info">
                        <h1 id="story-name">The Alchemy of Fear</h1>
                        <h4 id="chapter-name">Chapter 1 - The Invitation</h4>
                    </div>
                    <div className="bookmark-button-container">
                        <Button className='btn-primary'>
                            <FontAwesomeIcon icon={faBookmark} className='btn-icon' />
                            <span>Add bookmark</span>
                        </Button>
                    </div>
                </div>
                <div className="bottom-wrapper">
                    <div className="progressbar-outer">
                        <div 
                            className="progressbar-inner"
                            style={{ width: `${scrollProgress}%` }}
                        ></div>
                    </div>
                    <button id='hide-navbar-button' onClick={() => setHidden(!isHidden)}>
                        <FontAwesomeIcon icon={isHidden ? faChevronDown : faChevronUp} />
                    </button>
                </div>
            </nav>
            <div className="contents" ref={contentsRef} style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
                    <div className="text">
                    <p id='bookmarked-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, exercitationem commodi sint eum itaque similique dignissimos maxime perspiciatis nihil accusantium maiores. Culpa laborum, ad veniam deserunt fugit totam eius deleniti sit accusantium ipsa nulla voluptatibus, quis quidem corrupti commodi labore placeat distinctio. Saepe aliquid inventore ratione nulla architecto vel nihil perferendis mollitia, eligendi ad, delectus in quis id. Harum, enim.</p>
                    {/* Additional content */}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quibusdam consequuntur perferendis? Quas quae vel odio, temporibus rem, dignissimos quis numquam neque laboriosam quasi voluptate obcaecati, dolor veritatis! Aliquam quas soluta cupiditate voluptatum maiores minima doloribus animi, quis beatae ipsam modi rerum, voluptas enim nulla laborum iste saepe sequi. Tempore dolore delectus odit alias voluptate voluptas necessitatibus assumenda natus culpa.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis rem odio sit eius, corporis est dicta dolores exercitationem facilis eum quia libero perferendis reiciendis quo. Magni ex, maxime hic nam nemo voluptas optio iure ipsam? Voluptatibus nisi illum ipsa quis, excepturi ut ab in libero, quaerat accusantium fuga cum soluta architecto eligendi voluptas officiis vitae culpa quo nemo saepe recusandae.</p>
                    </div>
                    <div className="controls">
                    <DarkmodeToggle 
                        isChecked={isDark}
                        handleChange={() => setDark(!isDark)}
                    />
                    <button className="next">Next chapter</button>
                </div>
                </div>
        </div>
    );
}

export default DisplayStory;
