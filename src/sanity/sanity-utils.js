import { client } from "./client";

export async function fetchData() {
  console.log("Fetching data...");
  try {
    const [
      settings,
      projects,
      items,
      tags,
      people,
      exhibitions,
      organizations,
      references,
    ] = await Promise.all([
      getSettings(),
      getProjects(),
      getItems(),
      getTags(),
      getPeople(),
      getExhibitions(),
      getOrganizations(),
      getReferences(),
    ]);
    return {
      settings,
      projects,
      items,
      tags,
      people,
      exhibitions,
      organizations,
      references,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getSettings() {
  return client.fetch(`*[_type == "settings"][0]{
  title,
  info,
  hideCredits,
  audios[],
  credits[] {
    _key,
    role,
    subjects[]->{
      _id,
      _type,
      name,
      pseudonym,
      firstName,
      lastName,
      link
    }
  },
  links
}`);
}

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(title.en asc){
  _id,
  _type,
  title,
  slug,
  date,
  description,
  exhibitions->{
    _id,
    title,
  },
}`);
}

export async function getItems() {
  return client.fetch(`*[_type == "item"] | order(code asc){
  _id,
  _type,
  project->{
    _id,
    title,
  },
  code,
  slug,
  date,
  tags[]->{
    _id,
    name,
    description
  },
  template,
  location,
  name,
  lat,
  long,
  gps,
  l,
  w,
  h,
  kg,
  rockProperties,
  properties,
  video{
    url,
  },
 text {
    es,
    en,
    authors[]->{
      _id,
      _type,
      name,
      pseudonym,
      firstName,
      lastName
    }
  },
  images[]{
    _key,
    'url': asset->url,
    'dimensions': asset->metadata.dimensions,
  },
  credits[] {
    subject->{
      _id,
      _type,
      name,
      pseudonym,
      firstName,
      lastName
    },
    role {
      es,
      en
    }
  },
  references[]->{
    _id,
    apaReference,
    links,
    files[]{
      _key,
      'url': asset->{url},
    },
    authors[]->{
    _id,
    },
  },
  links[]{
    _key,
    text,
    url 
  },
  condition,
  isHighlighted
}`);
}

export async function getTags() {
  return client.fetch(`*[_type == "tag"] | order(geographic asc, name.en asc){
  _id,
  name,
  description,
  geographic
}`);
}

export async function getPeople() {
  return client.fetch(`*[_type == "person"] | order(lastName asc){
  _id,
  firstName,
  lastName,
  pseudonym,
  paricipant,
  projectAuthor,
  referenceAuthor,
  activity,
  link
}`);
}

export async function getExhibitions() {
  return client.fetch(`*[_type == "exhibition"]{
  _id,
  _type,
  code,
  long,
  lat,
  title,
  slug,
  date,
  description,
  location,
  link
}`);
}

export async function getOrganizations() {
  return client.fetch(`*[_type == "organization"] | order(name.en asc){
  _id,
  name,
  info,
  participant,
  projectAuthor,
  referenceAuthor,
  link
}`);
}

export async function getReferences() {
  return client.fetch(`*[_type == "referenceMaterial"]{
  _id,
  title,
  authors[]->{
    _id,
    _type,
    name,
    pseudonym,
    firstName,
    lastName,
  },
  date,
  dateDisplay,
  apaReference,
  files[]{
    _key,
    'url': asset->url
  },
  links
}`);
}
