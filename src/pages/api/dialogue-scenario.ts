import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface DialogueNode {
  id: string;
  speaker?: 'Gamius' | 'System' | 'User';
  text: string;
  choices?: Array<{
    id: string;
    text: string;
    nextNodeId: string;
    icon?: string;
    disabled?: boolean;
    animationTrigger?: string;
  }>;
  animationCue?: string;
  imageSrc?: string;
  isEnding?: boolean;
  mood?: 'neutral' | 'excited' | 'confused' | 'thinking' | 'mysterious';
  delay?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DialogueNode[] | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lang = 'en' } = req.query;
    
    // Determine which scenario file to load based on language
    let scenarioFileName = 'gamius_cat_scenario_fr.json';
    if (lang === 'fr') {
      scenarioFileName = 'gamius_cat_scenario_fr.json'; // Use the actual file name
    } else if (lang === 'en') {
      scenarioFileName = 'gamius_cat_scenario_fr.json'; // Fallback to French for now
    }
    
    // Path to the scenario file in the dialogues subdirectory
    const scenarioFilePath = path.join(process.cwd(), 'public', 'data', 'dialogues', scenarioFileName);
    
    // Check if the file exists, fallback to the French version
    let finalPath = scenarioFilePath;
    if (!fs.existsSync(scenarioFilePath)) {
      finalPath = path.join(process.cwd(), 'public', 'data', 'dialogues', 'gamius_cat_scenario_fr.json');
    }
    
    // Read and parse the scenario file
    const scenarioData = fs.readFileSync(finalPath, 'utf8');
    const parsedScenario: DialogueNode[] = JSON.parse(scenarioData);
    
    // Validate the scenario structure
    if (!Array.isArray(parsedScenario) || parsedScenario.length === 0) {
      throw new Error('Invalid scenario data: must be a non-empty array');
    }
    
    // Validate each node has required fields
    for (const node of parsedScenario) {
      if (!node.id || !node.text) {
        throw new Error(`Invalid node: missing id or text for node ${node.id || 'unknown'}`);
      }
    }
    
    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json');
    
    // Return the scenario data
    res.status(200).json(parsedScenario);
    
  } catch (error) {
    console.error('[API] Error loading dialogue scenario:', error);
    
    // Return appropriate error response
    if (error instanceof SyntaxError) {
      res.status(500).json({ error: 'Invalid JSON in scenario file' });
    } else if (error instanceof Error && error.message.includes('ENOENT')) {
      res.status(404).json({ error: 'Scenario file not found' });
    } else {
      res.status(500).json({ error: 'Failed to load dialogue scenario' });
    }
  }
}
