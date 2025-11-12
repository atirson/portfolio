import { gql } from 'graphql-request';
import { hygraph } from '../lib/hygraph';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      projects
    }
  }
`;

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  language: string;
  languageColor: string;
  githubUrl: string;
  stars: number;
  forks: number;
  featured: boolean;
  tags: string[];
};

export async function useGetProjects(): Promise<Project[]> {
  const data: any = await hygraph.request(GET_PROJECTS);
  return data.projects[0]?.projects as Project[];
}

export type Skill = {
  id: string;
  src: string;
  href: string;
};

const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      src
      href
    }
  }
`;


export async function useGetSkills(): Promise<Skill[]> {
  const data: any = await hygraph.request(GET_SKILLS);
  return data.skills || [];
}


const GET_PERSONAL_INFO = gql`
  query GetPersonalInfo {
    informations {
      resume {
        id
        url
      }
      resumePt {
        id
        url
      }
    }
  }
`;

export type Resume = {
  id: string;
  url: string;
};

export type PersonalInfo = {
  resume: Resume;
  resumePt: Resume;
};

export async function useGetPersonalInfo(): Promise<PersonalInfo | null> {
  const data: any = await hygraph.request(GET_PERSONAL_INFO);
  
  if (data.informations && data.informations.length > 0) {
    return data.informations[0] as PersonalInfo;
  }
  
  return null;
}