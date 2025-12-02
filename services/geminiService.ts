import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResult } from "../types";

function btoa_utf8(str: string) {
    return btoa(unescape(encodeURIComponent(str)));
}

const textModel = 'gemini-2.5-flash';
const imageModel = 'gemini-2.5-flash-image';

export const generateAffiliatePost = async (
  productName: string,
  productDescription: string,
  affiliateHoplink: string,
  templateName: string,
  onProgress: (step: number, message: string) => void
): Promise<GenerationResult> => {
    // FIX: Initialize with API key from environment variables as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    onProgress(1, 'Generating high-converting copy...');
    
    const ctaButtonHtml = `<a href="${affiliateHoplink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #22c55e; color: white; padding: 15px 30px; font-size: 20px; font-weight: bold; text-decoration: none; border-radius: 8px; text-align: center; transition: background-color 0.3s ease;">Click Here to Get Instant Access!</a>`;

    const contentPrompt = `
      You are an expert direct response copywriter and SEO specialist.
      Generate a complete, high-converting affiliate marketing landing page HTML content.
      Product: "${productName}"
      Description: "${productDescription}"
      Template Style: "${templateName}"
      Your response MUST be a JSON object with two keys: "htmlBodyContent" and "imagePrompts".
      "htmlBodyContent" requirements:
      - A single string of HTML for the <body>. Do NOT include <html>, <head>, or <body> tags.
      - Insert placeholders: "[HERO_IMAGE]", "[FEATURES_IMAGE]", and "[CTA_BANNER_IMAGE]".
      - Insert the placeholder: "[CTA_BUTTON]".
      "imagePrompts" requirements:
      - A JSON object with three keys: "hero", "features", and "ctaBanner".
      - Values must be descriptive prompts for generating visually stunning, relevant images (16:9 aspect ratio).
    `;

    // FIX: Added responseSchema for robust JSON output.
    const contentGenerationResponse = await ai.models.generateContent({
      model: textModel,
      contents: contentPrompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            htmlBodyContent: {
              type: Type.STRING,
            },
            imagePrompts: {
              type: Type.OBJECT,
              properties: {
                hero: { type: Type.STRING },
                features: { type: Type.STRING },
                ctaBanner: { type: Type.STRING },
              },
              required: ["hero", "features", "ctaBanner"],
            },
          },
          required: ["htmlBodyContent", "imagePrompts"],
        }
      }
    });
    const generatedContent = JSON.parse(contentGenerationResponse.text);
    const { htmlBodyContent, imagePrompts } = generatedContent;

    onProgress(2, 'Creating 3 professional images...');

    const imagePromises = [
      ai.models.generateContent({model: imageModel, contents: imagePrompts.hero, config: { imageConfig: { aspectRatio: "16:9" } } as any}),
      ai.models.generateContent({model: imageModel, contents: imagePrompts.features, config: { imageConfig: { aspectRatio: "16:9" } } as any}),
      ai.models.generateContent({model: imageModel, contents: imagePrompts.ctaBanner, config: { imageConfig: { aspectRatio: "16:9" } } as any})
    ];
    const imageResponses = await Promise.all(imagePromises);
    const base64Images = imageResponses.map(res => {
        // FIX: Iterating through parts to find image data as per guidelines.
        for (const part of res.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        throw new Error("Image data not found in response part");
    });

    onProgress(3, 'Building HTML & CSS...');

    const seoPrompt = `
      Based on the product "${productName}", create SEO metadata.
      Your response MUST be a valid JSON object with two keys: "title" and "metaDescription".
    `;
    // FIX: Added responseSchema for robust JSON output.
    const seoResponse = await ai.models.generateContent({
        model: textModel,
        contents: seoPrompt,
        config: { 
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    metaDescription: { type: Type.STRING },
                },
                required: ["title", "metaDescription"],
            },
        }
    });
    const seoData = JSON.parse(seoResponse.text);

    let finalHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${seoData.title}</title><meta name="description" content="${seoData.metaDescription}"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-100 text-gray-800 font-sans"><div class="container mx-auto p-4 md:p-8">${htmlBodyContent}</div></body></html>`;
    finalHtml = finalHtml.replace('[HERO_IMAGE]', `<img src="images/hero.png" alt="Hero image for ${productName}" class="w-full h-auto rounded-lg shadow-lg mb-8">`);
    finalHtml = finalHtml.replace('[FEATURES_IMAGE]', `<img src="images/features.png" alt="Features of ${productName}" class="w-full h-auto rounded-lg shadow-md my-8">`);
    finalHtml = finalHtml.replace('[CTA_BANNER_IMAGE]', `<img src="images/cta_banner.png" alt="Call to action banner" class="w-full h-auto rounded-lg shadow-md my-8">`);
    finalHtml = finalHtml.replace(/\[CTA_BUTTON\]/g, `<div class="text-center my-12">${ctaButtonHtml}</div>`);
    
    const previewHtmlBase64 = btoa_utf8(finalHtml);
    onProgress(4, 'Ready! Download below.');
    
    return {
      templateName: templateName,
      previewHtmlBase64: previewHtmlBase64,
      images: base64Images,
    };

  } catch (error) {
    console.error("Error generating affiliate post:", error);
    onProgress(0, ''); 
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred during generation.");
  }
};
