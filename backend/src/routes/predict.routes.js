const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post('/predict', (req, res) => {
  try {
    console.log('Received prediction request:', req.body);
    
    const inputData = JSON.stringify(req.body);
    
    // Get the absolute path to the predict.py script
    const predictScriptPath = path.join(__dirname, '../model/predict.py');
    
    // Execute Python script
    const command = `python3 "${predictScriptPath}" '${inputData}'`;
    
    console.log('Executing command:', command);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Python script execution error:', error);
        console.error('Python stderr:', stderr);
        
        try {
          if (stderr) {
            const errorObj = JSON.parse(stderr.trim());
            return res.status(500).json({ 
              error: errorObj.error || 'Prediction failed',
              success: false
            });
          }
        } catch (e) {
          return res.status(500).json({ 
            error: 'Prediction failed',
            details: stderr || error.message,
            success: false
          });
        }
      }
      
      console.log('Python stdout:', stdout);
      
      try {
        const result = JSON.parse(stdout.trim());
        
        // Ensure consistent response format
        const response = {
          success: result.success !== undefined ? result.success : true,
          predicted_price: result.predicted_price || result.prediction,
          location_column: result.location_column || result.location_used,
          availability_value: result.availability_value || result.availability_encoded,
          debug_info: result.debug_info
        };
        
        res.json(response);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        console.error('Raw stdout:', stdout);
        res.status(500).json({ 
          error: 'Invalid response from prediction model',
          details: stdout,
          success: false
        });
      }
    });
    
  } catch (error) {
    console.error('Route handler error:', error);
    res.status(500).json({ 
      error: 'Server error processing request',
      details: error.message,
      success: false
    });
  }
});


module.exports = router;