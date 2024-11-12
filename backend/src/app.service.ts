import { VertexAI } from '@google-cloud/vertexai';
import { Injectable } from '@nestjs/common';

const project = 'freedom-hackaton';
const location = 'us-central1';

@Injectable()
export class AppService {
  vertex: VertexAI;

  constructor() {
    this.vertex = new VertexAI({ project: project, location: location });
  }

  async uploadData(vacancy: string, resumes: File[]): string {
    const vertexAI = new VertexAI({
      project: 'freedom-hackaton',
      location: 'us-central1',
    });

    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });

    const filePart = {
      file_data: {
        file_uri: 'gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf',
        mime_type: 'application/pdf',
      },
    };
    const textPart = {
      text: `
    You are a very professional document summarization specialist.
    Please summarize the given document.`,
    };

    const request = {
      contents: [{ role: 'user', parts: [textPart, filePart] }],
    };

    const resp = await generativeModel.generateContent(request);
    const contentResponse = await resp.response;
    console.log(JSON.stringify(contentResponse));
  }
}
