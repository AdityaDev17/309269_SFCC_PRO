// // app/api/chat/route.tsx
// import { streamText } from 'ai';
// import { google } from '@ai-sdk/google'; // Ensure this import is correct

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // const cleanedMessages = body.messages.map((msg: any) => ({
//     //   role: msg.role,
//     //   content: msg.content // Do NOT include 'parts'
//     // }));
//     // console.log('34',cleanedMessages)
//     const messages = body.messages.map((m: any) => ({
//   role: m.role,
//   content: m.content
// }));

// console.log('24334',messages)

//     const result = await streamText({
//       model: google("models/gemini-pro"),
//       messages
//     });
//     console.log('3443',result.toDataStreamResponse())

//     return result.toDataStreamResponse();
//   } catch (err) {
//     console.error("Error during AI request:", err);
//     return new Response("An internal error occurred", { status: 500 });
//   }
// }
// // import { google } from "@ai-sdk/google";
// // import { streamText} from 'ai';

// // // Allow streaming responses up to 30 seconds
// // export const maxDuration = 30;

// // export async function POST(req: Request) {
// //   const { messages } = await req.json();

// //   const result = await streamText({
// //     model: google("models/gemini-1.5-pro-latest"),
// //     messages,
// //   });

// //   return result.toDataStreamResponse();
// // }
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    const { text } = await generateText({
      model: google('models/gemini-2.0-flash-exp'),
      prompt,
    })

    return Response.json({ text })
  } catch (error) {
    console.error('API error:', error)
    return new Response('Internal error', { status: 500 })
  }
}
