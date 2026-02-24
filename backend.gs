function doPost(e) {
  const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  
  if (!GEMINI_API_KEY) {
    return ContentService.createTextOutput(JSON.stringify({ error: "No API Key found in Script Properties" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const videoTitle = JSON.parse(e.postData.contents).videoTitle;
    
    const prompt = `Act as a cynical, evidence-based scientist. 
    Briefly critique the logic or potential 'noble lies' in this video title: "${videoTitle}". 
    Focus on model overfitting or lack of empirical evidence. Provide 3 short bullet points.`;

    const payload = { 
      contents: [{ parts: [{ text: prompt }] }] 
    };
    
    const options = {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true // Adding this so we can see the real error if it fails
    };

    // The Specific v1beta URL structure required for Flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.candidates && result.candidates[0].content.parts[0].text) {
      const critique = result.candidates[0].content.parts[0].text;
      return ContentService.createTextOutput(JSON.stringify({ critique: critique }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // If it still fails, return the actual error message from Google
      return ContentService.createTextOutput(JSON.stringify({ error: result.error ? result.error.message : "Invalid response structure" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}