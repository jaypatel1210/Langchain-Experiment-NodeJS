import 'dotenv/config';

import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAIEmbeddings } from '@langchain/openai';

const bollywoodMovies = [
  {
    id: 1,
    title: 'Dilwale Dulhania Le Jayenge',
    description: `A romantic drama where a young man and woman fall in love while traveling through Europe, but face challenges from their families.`,
  },
  {
    id: 2,
    title: 'Sholay',
    description: `An action-packed story of two criminals hired by a retired police officer to capture a ruthless bandit.`,
  },
  {
    id: 3,
    title: 'Kabhi Khushi Kabhie Gham',
    description: `A family drama that explores relationships, love, and the importance of family values.`,
  },
  {
    id: 4,
    title: 'Lagaan',
    description: `Set in colonial India, villagers challenge the British to a cricket match to avoid paying high taxes.`,
  },
  {
    id: 5,
    title: '3 Idiots',
    description: `A comedy-drama that follows the lives of three engineering students as they navigate the pressures of education and life.`,
  },
  {
    id: 6,
    title: 'Gully Boy',
    description: `A musical drama inspired by the lives of street rappers in Mumbai, showcasing the journey of an aspiring rapper.`,
  },
  {
    id: 7,
    title: 'Bajrangi Bhaijaan',
    description: `A heartwarming tale of a man who embarks on a journey to reunite a mute Pakistani girl with her family.`,
  },
  {
    id: 8,
    title: 'Dangal',
    description: `An inspiring sports drama based on the true story of a wrestler who trains his daughters to become world-class wrestlers.`,
  },
  {
    id: 9,
    title: 'Zindagi Na Milegi Dobara',
    description: `A coming-of-age story of three friends who embark on a road trip across Spain, exploring life and relationships.`,
  },
  {
    id: 10,
    title: 'Queen',
    description: `A young woman embarks on a solo honeymoon trip to Europe after her wedding is called off, discovering herself in the process.`,
  },
];

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    bollywoodMovies.map(
      movie =>
        new Document({
          pageContent: `Title: ${movie.title} \nDescription: ${movie.description}`,
          metadata: {
            id: movie.id,
            title: movie.title,
          },
          id: movie.id,
        })
    ),
    new OpenAIEmbeddings()
  );

const search = async (query, count = 1) => {
  const store = await createStore();
  return store.similaritySearchWithScore(query, count);
};

console.log(await search('i want to watch action movie', 2));
