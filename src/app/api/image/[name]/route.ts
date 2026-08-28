import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
    const resolvedParams = await params;
    const name = resolvedParams.name;
    const dir = path.join(process.cwd(), 'public', 'image');
    
    try {
        const files = fs.readdirSync(dir);
        const file = files.find(f => f.startsWith(name + '.'));
        
        if (file) {
            return NextResponse.redirect(new URL('/image/' + file, req.url));
        } else {
            return new NextResponse('Image not found', { status: 404 });
        }
    } catch (e) {
        return new NextResponse('Directory not found', { status: 404 });
    }
}
