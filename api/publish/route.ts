// app/api/publish/route.ts
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(req: NextRequest) {
  try {
    const { html, images, title } = await req.json();

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 60);

    // ساخت ZIP در حافظه
    const zip = new JSZip();
    zip.file('index.html', html);

    images.forEach((imgData: string, i: number) => {
      const base64 = imgData.split(',')[1];
      zip.file(`image-${i + 1}.jpg`, base64, { base64: true });
    });

    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    const zipBase64 = zipContent.toString('base64');

    // لینک Netlify (وقتی deploy کنی فعال میشه)
    const liveUrl = `https://${slug}.netlify.app`;

    return NextResponse.json({
      success: true,
      liveUrl,
      zipDownload: `data:application/zip;base64,${zipBase64}`,
      message: 'پست آماده انتشار شد! بعد از deploy روی Netlify، این لینک زنده میشه:',
      url: liveUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}