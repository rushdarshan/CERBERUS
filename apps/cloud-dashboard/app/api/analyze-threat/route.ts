import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, entropyScore, machineId } = body;

    // Dynamically template a premium, highly realistic AI analysis based on simulation parameters
    const isWannaCry = fileName?.toLowerCase().includes('wannacry') || fileName?.toLowerCase().includes('ransom');
    const classification = isWannaCry 
      ? `CLASSIFICATION: Severe ransomware signature matching WannaCry/Pathogen variant detected on node ${machineId || 'NODE-01'}.`
      : `CLASSIFICATION: Suspected packed malicious payload signature detected in '${fileName || 'payload.bin'}' on ${machineId || 'NODE-01'}.`;
      
    const behavior = `BEHAVIOR: File structural analysis reveals extreme packing density (${entropyScore?.toFixed(2) || '7.92'} bits/shannon), indicating deliberate obfuscation.`;
    
    const action = isWannaCry
      ? `ACTION: Subnet quarantine initiated. Isolate target machine immediately and invoke automated system snapshot recovery.`
      : `ACTION: Terminate parent process associated with ${fileName || 'payload.bin'} immediately and flag host for offline memory forensics.`;

    const lines = [classification, behavior, action];

    return NextResponse.json({ lines, source: 'offline-ai' });
  } catch (err) {
    console.error('analyze-threat error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
