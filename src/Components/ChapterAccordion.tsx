import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import '../CSS/ChapterAccordion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
interface Chapter {
  chapterNo: number;
  chapterName: string;
  chapterSummary: string;
  chapterURL: string;
  active: boolean;
}

interface ChapterAccordionProps {
  chapters: Chapter[];
}


const ChapterAccordion: React.FC<ChapterAccordionProps> = ({ chapters }) => {
  const navigate = useNavigate();
  return (
    <Accordion>
      {chapters.map((chapter, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>
            Chapter {chapter.chapterNo} - {chapter.chapterName}
            <FontAwesomeIcon icon={faBookmark} className={chapter.active ? 'bookmark-icon' : 'bookmark-icon-hidden'}/>
          </Accordion.Header>
          <Accordion.Body>
            <p>{chapter.chapterSummary}</p>
            <Button className='btn-primary' onClick={() => {navigate(`/${chapter.chapterURL}`)}}>
                <FontAwesomeIcon icon={faChevronRight} className='btn-icon'/>
                <span>
                {chapter.active ? 'Continue Reading' : 'Read'}
                </span>
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ChapterAccordion;
