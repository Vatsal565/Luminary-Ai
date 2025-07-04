import { log } from 'console';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const response = await fetch('https://luminary-ai-backend.onrender.com/api/home');
    
    const data = await response.json();

    log('Cron job executed successfully');
    log('Data fetched:', data);

    return new Response(data);
}