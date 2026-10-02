import { gql } from "graphql-request";
import { hygraph } from "../lib/hygraph";

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

type ProjectsResponse = { projects: { projects: Project[] }[] };

export async function getProjects(): Promise<Project[]> {
  const data = await hygraph.request<ProjectsResponse>(GET_PROJECTS);
  return data.projects[0]?.projects ?? [];
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

export async function getSkills(): Promise<Skill[]> {
  const data = await hygraph.request<{ skills?: Skill[] }>(GET_SKILLS);
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

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  const data = await hygraph.request<{ informations?: PersonalInfo[] }>(
    GET_PERSONAL_INFO,
  );
  return data.informations?.[0] ?? null;
}
