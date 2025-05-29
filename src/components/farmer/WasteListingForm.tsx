import React, { useState } from 'react';
import { Upload, MapPin, Leaf, Check, Loader2, Sparkles } from 'lucide-react';
import { storage, db, firebaseApp as firebase } from '../../lib/supabase'; // Uses Firebase
import imageCompression from 'browser-image-compression';

export const WasteListingForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeComplete, setAnalyzeComplete] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'uploading' | 'saving' | 'error' | 'success'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [predictedWasteType, setPredictedWasteType] = useState('');
  const [predictedSuggestedUse, setPredictedSuggestedUse] = useState('');
  const [predictedSuggestedPrice, setPredictedSuggestedPrice] = useState('');
  const [predictedCo2Saved, setPredictedCo2Saved] = useState('');

  const cropTypes = ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Potato', 'Tomato', 'Onion', 'Coconut', 'Other'];
  const locations = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true };
      try {
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);
        const reader = new FileReader();
        reader.onload = (event) => setImagePreview(event.target?.result as string);
        reader.readAsDataURL(compressedFile);
      } catch (error) { console.error('Image compression failed:', error); setImageFile(file); const reader = new FileReader(); reader.onload = (event) => setImagePreview(event.target?.result as string); reader.readAsDataURL(file); }
    }
  };

  const handleAutoCategorizePrediction = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPredictedWasteType(cropType === 'Rice' ? 'Rice Straw' : cropType === 'Wheat' ? 'Wheat Straw' : 'Generic Agricultural Residue');
      setPredictedSuggestedUse(cropType === 'Rice' ? 'Biochar, Mushroom Cultivation' : 'Compost, Animal Bedding, Biofuel feedstock');
      setPredictedSuggestedPrice(cropType === 'Rice' ? '2300' : '2100');
      setPredictedCo2Saved(cropType === 'Rice' ? '480' : '420');
      setIsAnalyzing(false); setAnalyzeComplete(true);
    }, 1500);
  };

  const handleGenerateDescription = async () => {
    if (!cropType || !quantity || !location) { alert("Please fill in Crop Type, Quantity, and Location first."); return; }
    setIsGeneratingDesc(true); setGeneratedDescription('');
    const prompt = `Generate a concise and appealing description for an agricultural waste listing. Details:\n- Crop Type: ${cropType}\n- Predicted Waste Type: ${predictedWasteType || 'N/A'}\n- Quantity: ${quantity} tons\n- Location: ${location}\n- Predicted Suggested Uses: ${predictedSuggestedUse || 'N/A'}\n- Farmer's Additional Notes: ${additionalNotes || 'None'}\n\nHighlight its potential value and availability. Keep it under 70 words.`;
    try {
      const apiKey = "AIzaSyCUqLHdR9gb3C_eg1pRk09DzVtmdaf_hEM"; const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) { const errorData = await response.json(); throw new Error(`Gemini API request failed: ${errorData?.error?.message || response.statusText}`); }
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) { setGeneratedDescription(result.candidates[0].content.parts[0].text.trim()); }
      else { setGeneratedDescription("Could not generate description. Please try again or write your own."); }
    } catch (error) { setGeneratedDescription(`Failed to generate: ${error instanceof Error ? error.message : "Unknown error"}.`); }
    finally { setIsGeneratingDesc(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !analyzeComplete) { alert('Please upload an image and complete the waste analysis.'); return; }
    if (!generatedDescription && !additionalNotes) { alert('Please generate a smart description or add your own notes.'); return; }
    setSubmissionStatus('uploading'); setUploadProgress(0);
    try {
      const fileName = `waste_images/${Date.now()}_${imageFile.name}`;
      const storageRef = storage.ref(fileName);
      const uploadTask = storageRef.put(imageFile);
      uploadTask.on('state_changed', (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => { console.error("Upload failed:", error); alert(`Upload failed: ${error.message}`); setSubmissionStatus('error'); },
        async () => {
          try {
            setSubmissionStatus('saving'); const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
            await db.collection('waste_listings').add({
              crop_type: cropType, quantity: parseFloat(quantity), location: location, description: generatedDescription || additionalNotes,
              image_url: imageUrl, listed_date: firebase.firestore.FieldValue.serverTimestamp(), predicted_waste_type: predictedWasteType,
              predicted_suggested_use: predictedSuggestedUse, predicted_suggested_price: predictedSuggestedPrice ? parseFloat(predictedSuggestedPrice) : null,
              predicted_co2_saved: predictedCo2Saved ? parseFloat(predictedCo2Saved) : null, status: 'active',
            });
            alert('Waste listing submitted successfully!'); setSubmissionStatus('success');
            setImageFile(null); setImagePreview(null); setCropType(''); setQuantity(''); setLocation(''); setAnalyzeComplete(false);
            setPredictedWasteType(''); setPredictedSuggestedUse(''); setPredictedSuggestedPrice(''); setPredictedCo2Saved('');
            setAdditionalNotes(''); setGeneratedDescription(''); setUploadProgress(0);
            setTimeout(() => setSubmissionStatus('idle'), 2000);
          } catch (dbError) { console.error('Error saving to Firestore:', dbError); alert(`Error saving listing: ${dbError instanceof Error ? dbError.message : ''}`); setSubmissionStatus('error'); }
        });
    } catch (error) { console.error('Error starting submission:', error); alert(`Error: ${error instanceof Error ? error.message : ''}`); setSubmissionStatus('error'); }
  };
  const isSubmitting = submissionStatus === 'uploading' || submissionStatus === 'saving';
  const getSubmitButtonText = () => submissionStatus === 'uploading' ? `Uploading (${uploadProgress.toFixed(0)}%)...` : submissionStatus === 'saving' ? 'Saving Listing...' : 'Submit Waste Listing';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">List Your Agricultural Waste</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6"> {/* Left Column */}
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Upload Waste Image</label>
              <div className={`border-2 border-dashed rounded-lg p-4 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 ${imagePreview ? 'border-primary-300' : 'border-gray-300'}`} onClick={() => !isSubmitting && document.getElementById('image-upload-farmer')?.click()}>
                <input type="file" id="image-upload-farmer" className="hidden" accept="image/*" onChange={handleImageChange} disabled={isSubmitting}/>
                {imagePreview && submissionStatus === 'idle' && (<img src={imagePreview} alt="Preview" className="h-full object-contain"/>)}
                {(submissionStatus === 'uploading' || submissionStatus === 'saving') && (<div className="w-full text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-primary-500" /><p className="text-sm text-gray-600 mt-2">{submissionStatus === 'uploading' ? `Uploading: ${uploadProgress.toFixed(0)}%` : 'Saving...'}</p>{submissionStatus === 'uploading' && (<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>)}</div>)}
                {submissionStatus === 'idle' && !imagePreview && (<><Upload className="h-10 w-10 text-gray-400 mb-2" /><p className="text-sm text-gray-500">Click to upload</p></>)}
              </div>
            </div>
            <div><label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label><select id="crop-type" value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required disabled={isSubmitting}><option value="">Select Crop Type</option>{cropTypes.map((c) => (<option key={c} value={c}>{c}</option>))}</select></div>
            <div><label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (tons)</label><input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="0.1" step="0.1" placeholder="e.g., 5.5" className="w-full p-3 border border-gray-300 rounded-lg" required disabled={isSubmitting}/></div>
            <div><label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label><div className="relative"><select id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 pl-10 border border-gray-300 rounded-lg" required disabled={isSubmitting}><option value="">Select Location</option>{locations.map((l) => (<option key={l} value={l}>{l}</option>))}</select><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div></div>
            <button type="button" onClick={handleAutoCategorizePrediction} disabled={!cropType||!quantity||!location||isAnalyzing||isSubmitting} className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${(!cropType||!quantity||!location||isAnalyzing||isSubmitting)?'bg-gray-200 text-gray-500 cursor-not-allowed':'bg-blue-500 hover:bg-blue-600 text-white'} transition-colors`}>{isAnalyzing?<><Loader2 className="animate-spin h-5 w-5 mr-2"/>Analyzing...</>:<><Leaf className="mr-2 h-5 w-5"/>Auto Analyze</>}</button>
          </div>
          <div className="space-y-6"> {/* Right Column */}
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Predicted Waste Type</label><div className="p-3 bg-gray-50 border rounded-lg min-h-[48px] flex items-center text-sm"><Leaf className="h-4 w-4 text-primary-500 mr-2 shrink-0"/>{predictedWasteType||<span className="italic text-gray-400">Results here</span>}</div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Predicted Uses</label><div className="p-3 bg-gray-50 border rounded-lg min-h-[48px] flex items-center text-sm">{predictedSuggestedUse||<span className="italic text-gray-400">Results here</span>}</div></div>
            <div><label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label><textarea id="additionalNotes" rows={2} value={additionalNotes} onChange={(e)=>setAdditionalNotes(e.target.value)} className="w-full p-3 border rounded-lg text-sm" placeholder="e.g., Dry, baled" disabled={isSubmitting||isGeneratingDesc}/></div>
            <button type="button" onClick={handleGenerateDescription} disabled={isGeneratingDesc||isSubmitting||!analyzeComplete} className={`w-full flex items-center justify-center p-3 rounded-lg font-medium text-white ${(!analyzeComplete||isGeneratingDesc||isSubmitting)?'bg-gray-300 cursor-not-allowed':'bg-teal-500 hover:bg-teal-600'} transition-colors`} title={!analyzeComplete?"Analyze first":"Generate with AI"}>{isGeneratingDesc?<Loader2 className="animate-spin h-5 w-5 mr-2"/>:<Sparkles className="mr-2 h-5 w-5"/>}{isGeneratingDesc?'Generating...':'✨ Smart Description'}</button>
            <div><label htmlFor="generatedDescription" className="block text-sm font-medium text-gray-700 mb-1">Listing Description</label><textarea id="generatedDescription" rows={4} value={generatedDescription} onChange={(e)=>setGeneratedDescription(e.target.value)} className="w-full p-3 border rounded-lg text-sm bg-gray-50 focus:bg-white" placeholder="AI description or write your own." required={!additionalNotes} disabled={isSubmitting}/>{generatedDescription&&<p className="text-xs text-gray-500 mt-1">Editable.</p>}</div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t"><button type="submit" disabled={!analyzeComplete||isSubmitting||(!generatedDescription&&!additionalNotes)} className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold text-white ${(!analyzeComplete||isSubmitting||(!generatedDescription&&!additionalNotes))?'bg-gray-300 cursor-not-allowed':'bg-primary-600 hover:bg-primary-700'} transition-colors`}>{isSubmitting?<Loader2 className="animate-spin h-5 w-5 mr-2"/>:<Check className="mr-2 h-5 w-5"/>}{getSubmitButtonText()}</button></div>
      </form>
    </div></div>
  );
};
