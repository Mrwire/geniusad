'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import { Button } from '@/components/atoms/Button';

// Define the shape of our test results
interface ImageTestResult {
  name: string;
  path: string;
  status: string;
}

interface ComponentTestResult {
  name: string;
  visible: boolean;
}

interface TestSummary {
  totalTested: number;
  successful: number;
  failed: number;
  allComponentsVisible: boolean;
}

interface TestResponse {
  success: boolean;
  message: string;
  testUrl: string;
  timestamp: string;
  results: ImageTestResult[];
  componentsTests: ComponentTestResult[];
  summary: TestSummary;
  logs: string[];
}

/**
 * Page to run Puppeteer image tests
 */
export default function PuppeteerImageTestPage() {
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [results, setResults] = useState<string>('');
  const [testResponse, setTestResponse] = useState<TestResponse | null>(null);
  
  const runPuppeteerTest = async () => {
    setTestStatus('running');
    setResults('Starting test...\n');
    setTestResponse(null);
    
    try {
      // Call our API route
      const response = await fetch('/api/mcp/test-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data: TestResponse = await response.json();
      setTestResponse(data);
      
      // Format the results as a string for display
      let formattedResults = '';
      
      // Add logs
      formattedResults += data.logs.join('\n') + '\n\n';
      
      // Add image test results
      formattedResults += 'Image Test Results:\n';
      formattedResults += '==================\n';
      
      data.results.forEach(result => {
        const statusEmoji = result.status === 'Success' ? '✅' : '❌';
        formattedResults += `${statusEmoji} ${result.name} (${result.path}): ${result.status}\n`;
      });
      
      // Add summary
      formattedResults += '\nSummary:\n';
      formattedResults += `Total images tested: ${data.summary.totalTested}\n`;
      formattedResults += `Successfully loaded: ${data.summary.successful}\n`;
      formattedResults += `Failed to load: ${data.summary.failed}\n\n`;
      
      // Add component tests
      data.componentsTests.forEach(component => {
        formattedResults += `Testing ${component.name} component...\n`;
        formattedResults += `${component.name} component visible: ${component.visible ? '✅' : '❌'}\n`;
      });
      
      // Add final result
      if (data.summary.failed === 0 && data.summary.allComponentsVisible) {
        formattedResults += '\n✅ All tests passed successfully!\n';
      } else {
        formattedResults += '\n❌ Some tests failed. Please check the results above.\n';
      }
      
      setResults(formattedResults);
      setTestStatus('completed');
      
    } catch (error) {
      console.error('Error running Puppeteer test:', error);
      setResults(prev => prev + `\nError: ${error instanceof Error ? error.message : String(error)}\n`);
      setTestStatus('error');
    }
  };
  
  return (
    <>
      <SkipNavigation />
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">Puppeteer Image Test</Typography>
            <Typography variant="body" className="mb-8">
              This tool runs a Puppeteer test to verify that images are loading correctly in the application.
            </Typography>
            
            <div className="flex flex-col space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Typography variant="h2" className="mb-4">Run Test</Typography>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="primary"
                    onClick={runPuppeteerTest}
                    disabled={testStatus === 'running'}
                  >
                    {testStatus === 'running' ? 'Running Test...' : 'Run Puppeteer Test'}
                  </Button>
                  
                  {testStatus !== 'idle' && (
                    <div className="flex items-center">
                      <span 
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          testStatus === 'running' ? 'bg-yellow-500' : 
                          testStatus === 'completed' ? 'bg-green-500' : 
                          'bg-red-500'
                        }`}
                      />
                      <span className="text-sm">
                        {testStatus === 'running' ? 'Running...' : 
                        testStatus === 'completed' ? 'Completed' : 
                        'Error'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <Typography variant="body" className="mb-2">Test Instructions:</Typography>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Make sure your Next.js development server is running.</li>
                    <li>Click the "Run Puppeteer Test" button above.</li>
                    <li>The test will automatically check image loading across the site.</li>
                    <li>Results will appear in the console output below.</li>
                  </ol>
                </div>
              </div>
              
              {results && (
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
                  <Typography variant="h2" className="mb-4 text-white">Test Results</Typography>
                  <pre className="font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {results}
                  </pre>
                </div>
              )}
              
              {testResponse && testResponse.success && (
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <Typography variant="h2" className="mb-4">Test Summary</Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Typography variant="label" className="text-sm text-gray-500">Total Images</Typography>
                      <Typography variant="h3" className="text-2xl">{testResponse.summary.totalTested}</Typography>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <Typography variant="label" className="text-sm text-green-600">Successful</Typography>
                      <Typography variant="h3" className="text-2xl text-green-600">{testResponse.summary.successful}</Typography>
                    </div>
                    
                    <div className={`${testResponse.summary.failed > 0 ? 'bg-red-50' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <Typography variant="label" className={`text-sm ${testResponse.summary.failed > 0 ? 'text-red-600' : 'text-gray-500'}`}>Failed</Typography>
                      <Typography variant="h3" className={`text-2xl ${testResponse.summary.failed > 0 ? 'text-red-600' : ''}`}>{testResponse.summary.failed}</Typography>
                    </div>
                  </div>
                  
                  <Typography variant="h3" className="mb-2">Components Test</Typography>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {testResponse.componentsTests.map((component, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{component.name}</td>
                            <td className="px-4 py-2">
                              {component.visible ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                  Visible
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                                  Not Visible
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <Typography variant="caption" className="text-gray-500">
                    Test completed at: {new Date(testResponse.timestamp).toLocaleString()}
                  </Typography>
                </div>
              )}
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <Typography variant="h2" className="mb-4">About Puppeteer Testing</Typography>
                <Typography variant="body" className="mb-3">
                  In a real implementation, this page would:
                </Typography>
                <ul className="list-disc list-inside space-y-2">
                  <li>Launch a Puppeteer browser instance on the server</li>
                  <li>Navigate to the image checker page to test loading of all images</li>
                  <li>Capture screenshots for visual verification</li>
                  <li>Return comprehensive test results</li>
                </ul>
                
                <Typography variant="body" className="mt-4">
                  The API route <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">/api/mcp/test-images</code> would 
                  use the MCP Puppeteer functions to run the actual tests. In this demo, we're using a simulated 
                  response to demonstrate the functionality.
                </Typography>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 