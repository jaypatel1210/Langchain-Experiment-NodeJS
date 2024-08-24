import openAI from './openai.js';
import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube';

const question = process.argv[2] || 'hi';
const video = 'https://www.youtube.com/watch?v=rIrNIzy6U_g';

const createStore = docs =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

const docsFromYTVideo = video => {
  const loader = YoutubeLoader.createFromUrl(video, {
    language: 'en',
    addVideoInfo: true,
  });

  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ' ',
      chunkSize: 1000,
      chunkOverlap: 70,
    })
  );
};

const docsFromPDF = () => {
  const loader = new PDFLoader('./assets/quick-start-playstation.pdf');

  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '. ',
      chunkSize: 300,
      chunkOverlap: 30,
    })
  );
};

const loadStore = async () => {
  const videoDocs = await docsFromYTVideo(video);
  const pdfDocs = await docsFromPDF();

  // console.log('VIDEO', videoDocs[0]);
  // console.log('PDF', pdfDocs[0]);

  return createStore([...videoDocs, ...pdfDocs]);
};

const query = async () => {
  const store = await loadStore();
  const results = await store.similaritySearch(question, 1);

  // console.log(results);

  const response = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful AI assistant. Answer questions to your best ability.',
      },
      {
        role: 'user',
        content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
          Question: ${question}
          Context: ${results.map(result => result.pageContent).join('\n ')}
        `,
      },
    ],
  });

  console.log(`
    Answer: ${response.choices[0].message.content}\n
    Sources: ${results.map(result => result.metadata.source).join(', ')}
    `);
};

query();
