import {createClient} from '@sanity/client';

export const client = createClient({
  projectId: 'an9xyr32',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-11-05',
});
