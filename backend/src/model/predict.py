import os
import sys
import json
import pickle
import pandas as pd

def availability_encode(x):
    """Convert availability input to 1 or 0 based on ML model logic"""
    if isinstance(x, str):
        # If it's a string, check for specific values
        if x.lower() in ['ready to move', 'immediate possession', 'ready to move', 'immediate possession']:
            return 1
        else:
            # For dates or other strings, return 0
            return 0
    elif isinstance(x, (int, float)):
        return 1 if x == 1 else 0
    else:
        return 0

def get_encoded_location(location_name):
    """Map actual location name to encoded column name"""
    # Location mapping based on value_counts
    location_mapping = {
        'Whitefield': '540.0',
        'Sarjapur Road': '399.0',
        'Electronic City': '302.0',
        'Kanakpura Road': '273.0',
        'Thanisandra': '234.0',
        'Yelahanka': '213.0',
        'Uttarahalli': '186.0',
        'Hebbal': '177.0',
        'Marathahalli': '175.0',
        'Raja Rajeshwari Nagar': '171.0',
        'Bannerghatta Road': '152.0',
        'Hennur Road': '152.0',
        '7th Phase JP Nagar': '149.0',
        'Haralur Road': '142.0',
        'Electronic City Phase II': '132.0',
        'Rajaji Nagar': '107.0',
        'Chandapura': '100.0',
        'Bellandur': '96.0',
        'KR Puram': '91.0',
        'Hoodi': '88.0',
        'Electronics City Phase 1': '88.0',
        'Yeshwanthpur': '85.0',
        'Begur Road': '84.0',
        'Sarjapur': '82.0',
        'Kasavanhalli': '80.0',
        'Harlur': '79.0',
        'Banashankari': '75.0',
        'Hormavu': '74.0',
        'Ramamurthy Nagar': '73.0',
        'Kengeri': '73.0',
        'Koramangala': '72.0',
        'JP Nagar': '72.0',
        'Hosa Road': '72.0',
        'Old Madras Road': '71.0',
        'Jakkur': '71.0',
        'Varthur': '70.0',
        'Kothanur': '66.0',
        'Kaggadasapura': '64.0',
        'Nagarbhavi': '63.0',
        'Thigalarapalya': '62.0',
        'Akshaya Nagar': '62.0',
        'TC Palaya': '60.0',
        'Malleshwaram': '58.0',
        '8th Phase JP Nagar': '57.0',
        'Rachenahalli': '56.0',
        'Hennur': '55.0',
        'Budigere': '54.0',
        'Jigani': '54.0',
        'HSR Layout': '53.0',
        'Jalahalli': '52.0',
        'Hulimavu': '52.0',
        'Bisuvanahalli': '51.0',
        'Panathur': '51.0',
        'Ramagondanahalli': '50.0',
        'Mysore Road': '50.0',
        'Bhoganhalli': '49.0',
        'Hegde Nagar': '49.0',
        'Gottigere': '48.0',
        'Hosur Road': '47.0',
        'Kundalahalli': '47.0',
        'Brookefield': '47.0',
        'Balagere': '45.0',
        'Devanahalli': '45.0',
        'Indira Nagar': '44.0',
        'CV Raman Nagar': '43.0',
        '9th Phase JP Nagar': '43.0',
        'Subramanyapura': '43.0',
        'Vidyaranyapura': '43.0',
        'Vittasandra': '43.0',
        'Kadugodi': '42.0',
        'Horamavu Agara': '42.0',
        'Kanakapura': '42.0',
        'Vijayanagar': '42.0',
        'Attibele': '42.0',
        'Yelahanka New Town': '41.0',
        'Talaghattapura': '40.0',
        'Kengeri Satellite Town': '40.0',
        'Kudlu Gate': '39.0',
        '5th Phase JP Nagar': '39.0',
        'Green Glen Layout': '39.0',
        'Sahakara Nagar': '39.0',
        'Channasandra': '38.0',
        'Bommasandra': '37.0',
        'Frazer Town': '36.0',
        'R.T. Nagar': '36.0',
        'Hosakerehalli': '36.0',
        'Lakshminarayana Pura': '36.0',
        'Anekal': '36.0',
        'Bommanahalli': '35.0',
        'Hebbal Kempapura': '34.0',
        'Old Airport Road': '33.0',
        'Kalena Agrahara': '33.0',
        'Tumkur Road': '33.0',
        'Basavangudi': '31.0',
        'Ambedkar Nagar': '31.0',
        'Mahadevpura': '31.0',
        'Ananth Nagar': '30.0',
        'Chikkalasandra': '30.0',
        'Doddathoguru': '30.0',
        'Kumaraswami Layout': '30.0',
        'BTM 2nd Stage': '29.0',
        'Kudlu': '29.0',
        'Kammasandra': '29.0',
        'Dodda Nekkundi': '29.0',
        'Somasundara Palya': '28.0',
        'Padmanabhanagar': '28.0',
        'Horamavu Banaswadi': '28.0',
        'Singasandra': '27.0',
        'Banashankari Stage III': '27.0',
        'Ambalipura': '27.0',
        'Kodichikkanahalli': '27.0',
        'Anandapura': '27.0',
        'Gubbalala': '26.0',
        'Kothannur': '26.0',
        'Bommasandra Industrial Area': '26.0',
        'Margondanahalli': '26.0',
        'Choodasandra': '26.0',
        'Iblur Village': '25.0',
        'Babusapalaya': '25.0',
        'Seegehalli': '25.0',
        '1st Phase JP Nagar': '25.0',
        'Magadi Road': '25.0',
        'Kogilu': '25.0',
        '2nd Stage Nagarbhavi': '24.0',
        'Battarahalli': '24.0',
        'Abbigere': '24.0',
        'Kambipura': '24.0',
        'Amruthahalli': '24.0',
        'Munnekollal': '24.0',
        'Ardendale': '24.0',
        'EPIP Zone': '23.0',
        'Lingadheeranahalli': '23.0',
        '6th Phase JP Nagar': '23.0',
        'Gunjur': '22.0',
        'Thubarahalli': '22.0',
        'Kaval Byrasandra': '22.0',
        'Hoskote': '22.0',
        'Sonnenahalli': '22.0',
        'Kathriguppe': '22.0',
        'Domlur': '22.0',
        'Rayasandra': '22.0',
        'Ulsoor': '21.0',
        'Basaveshwara Nagar': '21.0',
        'Binny Pete': '21.0',
        'Sanjay nagar': '20.0',
        'Poorna Pragna Layout': '20.0',
        'Yelachenahalli': '20.0',
        'HBR Layout': '20.0',
        'Kalyan nagar': '19.0',
        'Pai Layout': '19.0',
        'OMBR Layout': '19.0',
        'Kaggalipura': '19.0',
        'HRBR Layout': '19.0',
        'Kannamangala': '18.0',
        'Garudachar Palya': '18.0',
        'Bannerghatta': '18.0',
        'Billekahalli': '18.0',
        'BTM Layout': '17.0',
        'Nagavara': '17.0',
        'Sarjapura - Attibele Road': '17.0',
        'Chikka Tirupathi': '17.0',
        'Arekere': '17.0',
        'Kammanahalli': '17.0',
        'Malleshpalya': '17.0',
        'Dasarahalli': '17.0',
        'Kaikondrahalli': '17.0',
        'Banashankari Stage VI': '16.0',
        'Cooke Town': '16.0',
        'Parappana Agrahara': '16.0',
        'Dasanapura': '16.0',
        'Begur': '16.0',
        'Mallasandra': '16.0',
        'Anjanapura': '16.0',
        'Kasturi Nagar': '16.0',
        'Sector 2 HSR Layout': '16.0',
        'Banashankari Stage II': '16.0',
        'Kenchenahalli': '16.0',
        'Kereguddadahalli': '16.0',
        'Banaswadi': '16.0',
        'Judicial Layout': '16.0',
        'Chamrajpet': '15.0',
        'Varthur Road': '15.0',
        'Nagavarapalya': '15.0',
        'Benson Town': '15.0',
        'Kodihalli': '15.0',
        'Murugeshpalya': '14.0',
        'NGR Layout': '14.0',
        'NRI Layout': '14.0',
        'Devarachikkanahalli': '14.0',
        'Doddakallasandra': '14.0',
        'Sultan Palaya': '14.0',
        'Jalahalli East': '14.0',
        'Giri Nagar': '14.0',
        'Sarakki Nagar': '14.0',
        '1st Block Jayanagar': '14.0',
        'Sector 7 HSR Layout': '13.0',
        'Bommenahalli': '13.0',
        'Neeladri Nagar': '13.0',
        'Yelenahalli': '13.0',
        'Gollarapalya Hosahalli': '13.0',
        'Kadubeesanahalli': '13.0',
        'Shivaji Nagar': '13.0',
        'Dommasandra': '13.0',
        'Rajiv Nagar': '13.0',
        'Cunningham Road': '13.0',
        'BEML Layout': '13.0',
        'Chikkabanavar': '13.0',
        'Prithvi Layout': '13.0',
        'ISRO Layout': '13.0',
        'Konanakunte': '13.0',
        'Mahalakshmi Layout': '13.0',
        'Vishveshwarya Layout': '13.0',
        'Kodigehaali': '13.0',
        'Shampura': '13.0',
        'Karuna Nagar': '12.0',
        'Banashankari Stage V': '12.0',
        '5th Block Hbr Layout': '12.0',
        'Laggere': '12.0',
        'Badavala Nagar': '12.0',
        'ITPL': '12.0',
        'Cox Town': '12.0',
        'Vishwapriya Layout': '12.0',
        'GM Palaya': '12.0',
        'Vasanthapura': '12.0',
        'Bharathi Nagar': '12.0',
        'Nagasandra': '12.0',
        'Doddaballapur': '12.0',
        'Mico Layout': '12.0',
        'AECS Layout': '12.0',
        'Sompura': '12.0',
        'Thyagaraja Nagar': '11.0',
        'HAL 2nd Stage': '11.0',
        'Narayanapura': '11.0',
        'Marsur': '11.0',
        '2nd Phase Judicial Layout': '11.0',
        'LB Shastri Nagar': '11.0',
        'Pattandur Agrahara': '11.0',
        'Kodigehalli': '11.0',
        'Banjara Layout': '11.0',
        'Nehru Nagar': '11.0',
        'Tindlu': '11.0',
        'Dairy Circle': '10.0',
        '1st Block Koramangala': '10.0',
        'Sadashiva Nagar': '10.0',
        'Naganathapura': '10.0',
        'Gunjur Palya': '10.0',
        'Nagappa Reddy Layout': '10.0',
        'BTM 1st Stage': '10.0',
        'Basapura': '10.0',
        'Dodsworth Layout': '10.0',
        'Kalkere': '10.0',
        'Ganga Nagar': '10.0',
        'Nagadevanahalli': '10.0',
    }
    
    # Clean the location name
    clean_name = location_name.strip()
    
    # Try exact match first
    if clean_name in location_mapping:
        return location_mapping[clean_name]
    
    # Try case-insensitive match
    for key, value in location_mapping.items():
        if key.lower() == clean_name.lower():
            return value
    
    # Try partial match (for locations with similar names)
    for key, value in location_mapping.items():
        if clean_name.lower() in key.lower() or key.lower() in clean_name.lower():
            print(f"Partial match found: {clean_name} -> {key}", file=sys.stderr)
            return value
    
    # If not found, check if it's already encoded (numeric)
    if clean_name.replace('.', '', 1).isdigit():
        return clean_name
    
    # Default to 'Other'
    return 'Other'

def main():
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(script_dir, 'model.pickle')
        
        if not os.path.exists(model_path):
            error_msg = {"error": f"Model file not found at: {model_path}"}
            print(json.dumps(error_msg), file=sys.stderr)
            sys.exit(1)
        
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No input data provided"}), file=sys.stderr)
            sys.exit(1)
        
        input_data = json.loads(sys.argv[1])
        df = pd.DataFrame([input_data])
        
        if 'availability' in df.columns:
            df['availability'] = df['availability'].apply(availability_encode)
        else:
            df['availability'] = 0
        
        encoded_location = 'Other'
        if 'location' in df.columns:
            location_value = df['location'].iloc[0]
            encoded_location = get_encoded_location(str(location_value))
        
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
        
        for col in all_columns:
            if col not in df.columns:
                df[col] = 0
        
        location_col_name = f"location_{encoded_location}"
        if location_col_name in df.columns:
            df[location_col_name] = 1
        else:
            df['location_Other'] = 1
            location_col_name = 'location_Other'
        
        df = df[all_columns]
        
        prediction = model.predict(df)[0]
        
        result = {
            "predicted_price": float(prediction),
            "location_column": location_col_name,
            "availability_value": int(df['availability'].iloc[0]),
            "success": True
        }
        print(json.dumps(result))
        
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}), file=sys.stderr)
        sys.exit(1)
    except KeyError as e:
        print(json.dumps({"error": f"Missing required field: {str(e)}"}), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        error_msg = {
            "error": f"Prediction failed: {str(e)}",
            "success": False
        }
        print(json.dumps(error_msg), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()