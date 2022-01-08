/* eslint-disable react-hooks/exhaustive-deps */

import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Heading, Flex, Button } from '@chakra-ui/react'
import { GrFormAdd as AddIcon } from 'react-icons/gr'
import { MdSchool as SchoolIcon, MdWork as WorkIcon } from 'react-icons/md'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';

type TimelineDataProps = {
  props: {
    date: string,
    className: string,
    contentStyle: Object,
    contentArrowStyle: Object,
    iconStyle: Object,
    icon: ReactNode,
  },
  title: string,
  subtitle: string,
  content: string,
}

const dataExamples: TimelineDataProps[] = [
  {
    props: {
      date: '2011 - present',
      className: 'vertical-timeline-element--work',
      contentStyle: { background: '#000', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  #000' },
      iconStyle: { background: '#000', color: '#fff' },
      icon: <WorkIcon />,
    },
    title: 'Creative Director',
    subtitle: 'Miami, FL',
    content:
      'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
  },
  {
    props: {
      date: '2010 - 2011',
      className: 'vertical-timeline-element--education',
      contentStyle: { background: '#4b4d63', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  #4b4d63' },
      iconStyle: { background: '#4b4d63', color: '#fff' },
      icon: <SchoolIcon />,
    },
    title: 'Content Marketing for Web, Mobile and Social Media',
    subtitle: 'Online Course',
    content: 'Strategy, Social Media',
  },
];

const Timeline = () => {
  const [elements, setElements] = useState<TimelineDataProps[]>([]);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    setElements([...elements, ...dataExamples]);
  };

  const addButton = () => (
    <Button color="primary" aria-label="add">
      <AddIcon />
    </Button>
  );

  const getTimelineElements = () =>
    elements.map((element, index) => (
      <VerticalTimelineElement key={index} {...element.props}>
        <h3 className="vertical-timeline-element-title">{element.title}</h3>
        <h4 className="vertical-timeline-element-subtitle">
          {element.subtitle}
        </h4>
        <p>{element.content}</p>
      </VerticalTimelineElement>
  ));

  return (
    <Container maxW={1480} display="flex" justifyContent="space-evenly" h="300" p={8} mt={{ sm: 18, md: 18, '2xl': 18}}>
      <Flex direction="column" align="center">
        <Heading>
          My Experience
        </Heading>
        <Heading as='h4' size='md' color="gray.200" mt="2">
          Timeline about my experience in the field of technology
        </Heading>
        <div style={{ width: 900, marginTop: 60 }}>
          <VerticalTimeline>
            {getTimelineElements()}
            <VerticalTimelineElement
              iconOnClick={loadMore}
              iconClassName="vertical-timeline-element-icon--button"
              icon={addButton()}
            />
          </VerticalTimeline>
        </div>
      </Flex>
      
    </Container>
  )
}

export default Timeline