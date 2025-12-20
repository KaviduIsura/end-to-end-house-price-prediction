const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post('/predict', (req, res) => {
  const inputData = JSON.stringify(req.body);
  
  // Get the absolute path to the predict.py script
  const predictScriptPath = path.join(__dirname, '../model/predict.py');
  
  // Execute with absolute path to avoid working directory issues
  const command = `python3 "${predictScriptPath}" '${inputData}'`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Python script error:', stderr);
      
      try {
        // Try to parse stderr as JSON
        const errorObj = JSON.parse(stderr.trim());
        return res.status(500).json({ error: errorObj.error || stderr });
      } catch {
        return res.status(500).json({ 
          error: error.message || 'Prediction failed',
          details: stderr 
        });
      }
    }
    
    try {
      const result = JSON.parse(stdout.trim());
      res.json({ predicted_price: result.prediction });
    } catch (parseError) {
      console.error('Failed to parse Python output:', stdout, stderr);
      res.status(500).json({ 
        error: 'Invalid response from prediction model',
        output: stdout 
      });
    }
  });
});

module.exports = router;