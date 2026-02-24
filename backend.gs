const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

function doPost(e) {
  const videoTitle = JSON.parse(e.postData.contents).videoTitle;
  
  // The "Cynical Scientist" Prompt from your design docs
  const prompt = `Act as a cynical, evidence-based scientist. 
  Briefly critique the logic or potential 'noble lies' in this video title: "${videoTitle}". 
  Focus on model overfitting or lack of fossil evidence. 3 bullet points.`;

  const payload = { 
    contents: [{ parts: [{ text: prompt }] }] 
  };
  
  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, options);
    const result = JSON.parse(response.getContentText());
    const critique = result.candidates[0].content.parts[0].text;

    return ContentService.createTextOutput(JSON.stringify({ critique: critique }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}