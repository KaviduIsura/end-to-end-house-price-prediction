import os
import sys
import json
import pickle
import pandas as pd

def main():
    try:
        # Get the absolute path to the model file
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, 'model.pickle')
        
        # Check if model file exists
        if not os.path.exists(model_path):
            error_msg = {"error": f"Model file not found at: {model_path}"}
            print(json.dumps(error_msg), file=sys.stderr)
            sys.exit(1)
        
        # Load the model
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        # Get input data from command line argument
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No input data provided"}), file=sys.stderr)
            sys.exit(1)
        
        input_data = json.loads(sys.argv[1])
        df = pd.DataFrame([input_data])
        
        # Preprocessing
        df['availability'] = df['availability'].map(lambda x: 1 if x == 1 else 0)
        
        # Define ALL columns that were in the training data (EXCLUDING price if it's the target)
        all_columns = [
            'availability', 'total_sqft', 'bath', 'balcony', 'bhk',
            'log_price_per_sqft', 'location_2.0', 'location_3.0', 'location_4.0',
            'location_5.0', 'location_6.0', 'location_7.0', 'location_8.0',
            'location_9.0', 'location_10.0', 'location_11.0', 'location_12.0',
            'location_13.0', 'location_14.0', 'location_15.0', 'location_16.0',
            'location_17.0', 'location_18.0', 'location_19.0', 'location_20.0',
            'location_21.0', 'location_22.0', 'location_23.0', 'location_24.0',
            'location_25.0', 'location_26.0', 'location_27.0', 'location_28.0',
            'location_29.0', 'location_30.0', 'location_31.0', 'location_33.0',
            'location_34.0', 'location_35.0', 'location_36.0', 'location_37.0',
            'location_38.0', 'location_39.0', 'location_40.0', 'location_41.0',
            'location_42.0', 'location_43.0', 'location_44.0', 'location_45.0',
            'location_47.0', 'location_48.0', 'location_49.0', 'location_50.0',
            'location_51.0', 'location_52.0', 'location_53.0', 'location_54.0',
            'location_55.0', 'location_56.0', 'location_57.0', 'location_58.0',
            'location_60.0', 'location_62.0', 'location_63.0', 'location_64.0',
            'location_66.0', 'location_70.0', 'location_71.0', 'location_72.0',
            'location_73.0', 'location_74.0', 'location_75.0', 'location_79.0',
            'location_80.0', 'location_82.0', 'location_84.0', 'location_85.0',
            'location_88.0', 'location_91.0', 'location_96.0', 'location_100.0',
            'location_107.0', 'location_132.0', 'location_142.0', 'location_149.0',
            'location_152.0', 'location_171.0', 'location_175.0', 'location_177.0',
            'location_186.0', 'location_213.0', 'location_234.0', 'location_273.0',
            'location_302.0', 'location_399.0', 'location_540.0', 'location_Other'
        ]
        
        # Add missing columns with 0
        for col in all_columns:
            if col not in df.columns:
                df[col] = 0
        
        # Ensure correct column order
        df = df[all_columns]
        
        # Make prediction
        prediction = model.predict(df)[0]
        
        # Return as JSON
        result = {"prediction": float(prediction)}
        print(json.dumps(result))
        
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}), file=sys.stderr)
        sys.exit(1)
    except KeyError as e:
        print(json.dumps({"error": f"Missing required field: {str(e)}"}), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": f"Prediction failed: {str(e)}"}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()