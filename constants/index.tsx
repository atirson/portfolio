import { MdSchool as SchoolIcon, MdWork as WorkIcon } from 'react-icons/md'

export const TIMELINE = [
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
  },
  {
    id: '2',
    props: {
      date: '2021 - present',
      className: 'vertical-timeline-element--education',
      contentStyle: { background: '#4b4d63', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  #4b4d63' },
      iconStyle: { background: '#4b4d63', color: '#fff' },
      icon: <WorkIcon />,
    },
    title: 'ReactJS Expert Tutor',
    subtitle: 'AlgaWorks',
    content: `Tutor ReactJS I'm responsable to answer questions of students and give orientation how to fix some problems into universe of ReactJS.`,
  },
  {
    id: '3',
    props: {
      date: '2019 - 2020',
      className: 'vertical-timeline-element--education',
      contentStyle: { background: '#000', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  #000' },
      iconStyle: { background: '#000', color: '#fff' },
      icon: <WorkIcon />,
    },
    title: 'Frontend Developer',
    subtitle: 'Inline Engenharia',
    content: `Development of web pages with Javascript, ReactJS and mobile using React Native and at back-end NodeJs and PHP. During my experience I was use SQLite, MySql and Postgres.`,
  },
  {
    id: '4',
    props: {
      date: '2018 - 2021',
      className: 'vertical-timeline-element--education',
      contentStyle: { background: '#4b4d63', color: '#fff' },
      contentArrowStyle: { borderRight: '7px solid  #4b4d63' },
      iconStyle: { background: '#4b4d63', color: '#fff' },
      icon: <SchoolIcon />,
    },
    title: 'Bachelor Degree at Software Engineer',
    subtitle: 'Universidade - UniEvangélica de Anápolis',
    content: `I was a student of the University of Anápolis, Brazil. I studied the field of Computer Science and Information Systems. With focus in development, test, management and etc.`,
  },
];