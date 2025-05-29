import React, { useState } from 'react'; // Already imported if in same file, ensure single import if separate
import { Loader2, Lightbulb, Search } from 'lucide-react';

const WasteValorizationIdeas: React.FC = () => {
  const [wasteTypeInput, setWasteTypeInput] = useState('');
  const [valorizationIdeas, setValorizationIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdeas = async (e: React.FormEvent) => {
    e.preventDefault(); if (!wasteTypeInput.trim()) { setError("Please enter a type of agricultural waste."); return; }
    setIsLoading(true); setError(null); setValorizationIdeas([]);
    const prompt = `List 5 to 7 innovative and practical valorization ideas or products for "${wasteTypeInput}" agricultural waste. For each, briefly explain (1-2 sentences) focusing on sustainability and economic viability. Format as bullet points.`;
    try {
      const apiKey = "AIzaSyCVOs81A4E9PTELfPjbq3Aodo42vXWc_YE"; const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) { const errorData = await response.json(); throw new Error(`API request failed: ${errorData?.error?.message || response.statusText}`); }
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = result.candidates[0].content.parts[0].text;
        const ideasArray = text.split(/\s*(?:\*|-)\s+/).filter(idea => idea.trim() !== '');
        setValorizationIdeas(ideasArray);
      } else { setError("Could not parse ideas from the response."); }
    } catch (err) { setError(err instanceof Error ? err.message : "An unknown error occurred."); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Discover Waste Valorization Ideas ✨</h3>
      <p className="text-gray-600 mb-6">Enter waste type (e.g., "rice husk") for AI-powered usage ideas.</p>
      <form onSubmit={handleGenerateIdeas} className="space-y-4 mb-6">
        <div><label htmlFor="wasteTypeInputValor" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
          <div className="relative"><input type="text" id="wasteTypeInputValor" value={wasteTypeInput} onChange={(e)=>{setWasteTypeInput(e.target.value);setError(null);}} placeholder="e.g., Wheat Straw" className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-secondary-500" required/><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/></div>
        </div>
        <button type="submit" disabled={isLoading||!wasteTypeInput.trim()} className={`w-full flex items-center justify-center p-3 rounded-lg font-medium text-white ${(isLoading||!wasteTypeInput.trim())?'bg-gray-300 cursor-not-allowed':'bg-secondary-500 hover:bg-secondary-600'} transition-colors`}>{isLoading?<Loader2 className="animate-spin h-5 w-5 mr-2"/>:<Lightbulb className="mr-2 h-5 w-5"/>}{isLoading?'Generating...':'Get Ideas'}</button>
      </form>
      {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</p>}
      {valorizationIdeas.length > 0 && (<div className="mt-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Ideas for "{wasteTypeInput}":</h4>
        <ul className="list-disc list-inside space-y-2 pl-2 text-gray-700 bg-gray-50 p-4 rounded-md">
          {valorizationIdeas.map((idea, index) => (<li key={index} className="text-sm leading-relaxed">{idea}</li>))}
        </ul>
      </div>)}
    </div></div>
  );