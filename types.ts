
export interface GeneratedPost {
  id: string;
  templateName: string;
  productName: string;
  htmlContent: string;
  images: string[]; // Array of base64 image data URIs
  createdAt: string;
}

export interface GenerationResult {
  templateName: string;
  previewHtmlBase64: string;
  images: string[];
}
