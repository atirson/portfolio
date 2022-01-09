/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useState } from 'react';
import { Container, Heading, Flex, Button } from '@chakra-ui/react'
import { GrFormAdd as AddIcon } from 'react-icons/gr'
import { MdWork as WorkIcon } from 'react-icons/md'
import { AiFillStar } from 'react-icons/ai'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { IconType } from 'react-icons';
import { TIMELINE } from '../../../constants';

type TimelineDataProps = {
  id: string,
  props: {
    date: string,
    className: string,
    contentStyle: Object,
    contentArrowStyle: Object,
    iconStyle: Object,
    icon: ReactNode | IconType,
  },
  title: string,
  subtitle: string,
  content: string,
}

const Timeline = () => {
  const [elements, setElements] = useState<TimelineDataProps[]>([
    {
      id: '1',
      props: {
        date: '2020 - present',
        className: 'vertical-timeline-element--work',
        contentStyle: { background: '#000', color: '#fff' },
        contentArrowStyle: { borderRight: '7px solid  #000' },
        iconStyle: { background: '#000', color: '#fff' },
        icon: <WorkIcon />,
      },
      title: 'Fullstack Developer',
      subtitle: 'Squadra Tecnologia',
      content:
        `Work to a lot of clients and projects. Using technologies like Node, React, NextJS, TypeScript, PHP, MongoDB, MySQL, Docker, AWS, etc.`,
    }
  ]);


  const loadMore = () => {
    const arrayFiltered = TIMELINE.slice(0, elements.length + 2);
    setElements(arrayFiltered);
  };

  const addButton = () => (
    elements.length === TIMELINE.length ?
    <Button _hover={{ backgroundColor: 'green' }} bg="green" ml={{ sm: "0", md: "2", '2xl': "2"}} title="Start">
      <AiFillStar color="#fff" />
    </Button>
    :  
    <Button bg="white" ml={{ sm: "0", md: "2", '2xl': "2"}} title="Add">
      <AddIcon color="#000" />
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
    <Container maxW={1480} display="flex" justifyContent="space-evenly" h="300" p={8} mt={{ sm: "256", md: 18, '2xl': 18}}>
      <Flex direction="column" align="center">
        <Heading>
          My Experience
        </Heading>
        <Heading as='h4' size='md' color="gray.200" mt="2" textAlign="center">
          Timeline about my experience in the field of technology
        </Heading>
        <div style={{ marginTop: 60 }}>
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