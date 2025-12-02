// import { generateText } from 'ai';
// import{google} from '@ai-sdk/google';
// import { getRandomInterviewCover } from '@/lib/utils';
// import { db } from '@/firebase/admin';

// export async function GET(){
//     return Response.json({success:true, data:'THANK YOU!'},{status:200});
// }

// export async function POST(request: Request){
//     const{ type, role, level, techstack,amount, userid}= await request.json();

//     try{
//          const { text: questions } = await generateText({
//            model: google("gemini-2.0-flash-001"),
//            prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
//          });

//          const interview={
//             role, type, level, techstack: techstack.split(','), questions: JSON.parse(questions), userId:userid, finalized: true, coverImage: getRandomInterviewCover(), createdAt: new Date().toISOString()
//          }

//          await db.collection('interviews').add(interview);

//          return Response.json({success:true, data:interview},{status:200});


//     }catch(error){
//         console.error(error);
//         return Response.json({success:false, error},{status:500});
//     }

// }
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
// removed: import { db } from '@/firebase/admin';

export async function GET() {
  return Response.json({ success: true, data: "THANK YOU!" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // DYNAMIC import of db to avoid evaluating firebase-admin at build time
    // This ensures the firebase/service-account parsing only happens at runtime (request time),
    // preventing the Vercel "collecting page data" build-time error.
    const adminModule = await import("@/firebase/admin");
    // support both `export const db = ...` and `export default db` cases:
    const db = adminModule.db ?? adminModule.default ?? adminModule;

    await db.collection("interviews").add(interview);

    return Response.json({ success: true, data: interview }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
