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
    Focus on model overfitting or lack of fossil/empirical evidence. Provide 3 short bullet points.`;

    const payload = { 
      contents: [{ parts: [{ text: prompt }] }] 
    };
    
    const options = {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, options);
    const result = JSON.parse(response.getContentText());
    
    // Safety check for Gemini response structure
    if (result.candidates && result.candidates[0].content.parts[0].text) {
      const critique = result.candidates[0].content.parts[0].text;
      return ContentService.createTextOutput(JSON.stringify({ critique: critique }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error("Invalid response from Gemini");
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}