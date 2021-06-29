import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleQuantile } from 'd3-scale';

import india from './topojsons/india.json';
// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: 'red',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};
const getHeatMapData = () => {
  return [
    // { "orderCount": { "stateCount": { "HARYANA": { "count": 19, "lat": 29.0587757, "lng": 76.085601 }, "SIKKIM": { "count": 2, "lat": 27.5329718, "lng": 88.5122178 }, "DELHI": { "count": 20, "lat": 28.7040592, "lng": 77.10249019999999 }, "TELANGANA": { "count": 43, "lat": 18.1124372, "lng": 79.01929969999999 }, "RAJASTHAN": { "count": 8, "lat": 27.0238036, "lng": 74.21793260000001 }, "UTTAR PRADESH": { "count": 30, "lat": 26.8467088, "lng": 80.9461592 }, "ANDHRA PRADESH": { "count": 23, "lat": 15.9128998, "lng": 79.7399875 }, "KARNATAKA": { "count": 68, "lat": 15.3172775, "lng": 75.7138884 }, "WEST BENGAL": { "count": 36, "lat": 22.9867569, "lng": 87.8549755 }, "MIZORAM": { "count": 2, "lat": 23.164543, "lng": 92.9375739 }, "MAHARASHTRA": { "count": 43, "lat": 19.7514798, "lng": 75.7138884 }, "KERALA": { "count": 33, "lat": 10.8505159, "lng": 76.2710833 }, "MEGHALAYA": { "count": 1, "lat": 25.4670308, "lng": 91.366216 }, "JHARKHAND": { "count": 9, "lat": 23.6101808, "lng": 85.2799354 }, "TAMIL NADU": { "count": 38, "lat": 11.1271225, "lng": 78.6568942 }, "GUJARAT": { "count": 11, "lat": 22.258652, "lng": 71.1923805 }, "ASSAM": { "count": 9, "lat": 26.2006043, "lng": 92.9375739 }, "ODISHA": { "count": 18, "lat": 20.9516658, "lng": 85.0985236 }, "PUNJAB": { "count": 8, "lat": 31.1471305, "lng": 75.34121789999999 }, "ANDHRAPRADESH": { "count": 4 }, "UTTARAKHAND": { "count": 6, "lat": 30.066753, "lng": 79.01929969999999 }, "MANIPUR": { "count": 5, "lat": 24.6637173, "lng": 93.90626879999999 }, "BIHAR": { "count": 7, "lat": 25.0960742, "lng": 85.31311939999999 }, "TRIPURA": { "count": 1, "lat": 23.9408482, "lng": 91.9881527 }, "MADHYA PRADESH": { "count": 12, "lat": 22.9734229, "lng": 78.6568942 }, "CHHATTISGARH": { "count": 4, "lat": 21.2786567, "lng": 81.8661442 }, "CHANDIGARH": { "count": 2, "lat": 30.7333148, "lng": 76.7794179 }, "JAMMU & KASHMIR": { "count": 7, "lat": 32.7266016, "lng": 74.8570259 }, "GOA": { "count": 3, "lat": 15.2993265, "lng": 74.12399599999999 }, "NAGALAND": { "count": 1, "lat": 26.1584354, "lng": 94.5624426 }, "RAJESTHAN": { "count": 1 }, "PUDUCHERRY": { "count": 1, "lat": 11.9415915, "lng": 79.8083133 }, "TAMILNADU": { "count": 1, "lat": 11.1271225, "lng": 78.6568942 }, "TN": { "count": 1 }, "HIMACHAL PRADESH": { "count": 2, "lat": 31.1048294, "lng": 77.17339009999999 }, "PONDICHERRY": { "count": 1 } }, "distCount": { "ROHTAK": { "count": 2, "lat": 28.8955152, "lng": 76.606611 }, "SOUTH SIKKIM": { "count": 1, "lat": 27.28584, "lng": 88.3945669 }, "NEW DELHI": { "count": 17, "lat": 28.6139391, "lng": 77.2090212 }, "ALWAR": { "count": 1, "lat": 27.5529907, "lng": 76.6345735 }, "LUCKNOW": { "count": 4, "lat": 26.8466937, "lng": 80.94616599999999 }, "GUNTUR": { "count": 3, "lat": 16.3066525, "lng": 80.4365402 }, "BANGALORE": { "count": 38, "lat": 12.9715987, "lng": 77.5945627 }, "NADIA": { "count": 1, "lat": 37.0521203, "lng": -94.52389149999999 }, "AIZAWL": { "count": 2, "lat": 23.7307175, "lng": 92.71731059999999 }, "JODHPUR": { "count": 1, "lat": 26.2389469, "lng": 73.02430939999999 }, "NORTH 24 PARGANAS": { "count": 6, "lat": 22.6168099, "lng": 88.402895 }, "MUMBAI": { "count": 20, "lat": 19.0759837, "lng": 72.8776559 }, "SIROHI": { "count": 1, "lat": 24.8851548, "lng": 72.8574558 }, "THIRUVANANTHAPURAM": { "count": 12, "lat": 8.5241391, "lng": 76.9366376 }, "DHARWAD": { "count": 1, "lat": 15.4589236, "lng": 75.007808 }, "GURGAON": { "count": 7, "lat": 28.4594965, "lng": 77.0266383 }, "CHITTOOR": { "count": 7, "lat": 13.217176, "lng": 79.1003289 }, "RANCHI": { "count": 6, "lat": 23.3440997, "lng": 85.309562 }, "NELLORE": { "count": 3, "lat": 14.4425987, "lng": 79.98645599999999 }, "KALABURAGI": { "count": 2, "lat": 17.329731, "lng": 76.8342957 }, "CHENNAI": { "count": 10, "lat": 13.0826802, "lng": 80.2707184 }, "VIRUDHUNAGAR": { "count": 1, "lat": 9.5680116, "lng": 77.96244349999999 }, "PANCH MAHALS": { "count": 1, "lat": 22.8011177, "lng": 73.55941279999999 }, "KAMRUP": { "count": 3, "lat": 26.3160819, "lng": 91.5983959 }, "KHORDA": { "count": 4, "lat": 20.130141, "lng": 85.47880649999999 }, "DHARMAPURI": { "count": 2, "lat": 12.1210997, "lng": 78.1582143 }, "HYDERABAD": { "count": 14, "lat": 17.385044, "lng": 78.486671 }, "MATHURA": { "count": 3, "lat": 27.4924134, "lng": 77.673673 }, "AHMEDABAD": { "count": 4, "lat": 23.022505, "lng": 72.5713621 }, "BASTI": { "count": 1, "lat": 26.8139844, "lng": 82.7629893 }, "PATIALA": { "count": 1, "lat": 30.3397809, "lng": 76.3868797 }, "THRISSUR": { "count": 4, "lat": 10.5276416, "lng": 76.2144349 }, "WEST GODAVARI": { "count": 5, "lat": 16.9174181, "lng": 81.3399414 }, "KURUKSHETRA": { "count": 1, "lat": 29.9695121, "lng": 76.878282 }, "AMBALA": { "count": 1, "lat": 30.3752011, "lng": 76.782122 }, "NAINITAL": { "count": 1, "lat": 29.3919202, "lng": 79.4542033 }, "PATHANAMTHITTA": { "count": 1, "lat": 9.2647582, "lng": 76.78704139999999 }, "CHAMRAJNAGAR": { "count": 1, "lat": 11.9261471, "lng": 76.9437312 }, "IMPHAL WEST": { "count": 5, "lat": 24.7827837, "lng": 93.88589549999999 }, "PATNA": { "count": 1, "lat": 25.5940947, "lng": 85.1375645 }, "WEST TRIPURA": { "count": 1, "lat": 23.899682, "lng": 91.4048249 }, "ERNAKULAM": { "count": 3, "lat": 9.9816358, "lng": 76.2998842 }, "JHAJJAR": { "count": 1, "lat": 28.6054875, "lng": 76.6537749 }, "DUMKA": { "count": 1, "lat": 24.2684794, "lng": 87.24880879999999 }, "PRAKASAM": { "count": 2, "lat": 15.348463, "lng": 79.560344 }, "BALAGHAT": { "count": 1, "lat": 21.812876, "lng": 80.18382930000001 }, "KOTTAYAM": { "count": 2, "lat": 9.591566799999999, "lng": 76.5221531 }, "SOUTH 24 PARGANAS": { "count": 2, "lat": 22.1352378, "lng": 88.4016041 }, "LAKHIMPUR": { "count": 1, "lat": 27.9462395, "lng": 80.7787163 }, "BAREILLY": { "count": 2, "lat": 28.3670355, "lng": 79.4304381 }, "COIMBATORE": { "count": 3, "lat": 11.0168445, "lng": 76.9558321 }, "ALLAHABAD": { "count": 1, "lat": 25.4358011, "lng": 81.846311 }, "KOLKATA": { "count": 9, "lat": 22.572646, "lng": 88.36389500000001 }, "KHAMMAM": { "count": 1, "lat": 17.2472528, "lng": 80.1514447 }, "THANE": { "count": 7, "lat": 19.2183307, "lng": 72.9780897 }, "BARGARH": { "count": 1, "lat": 21.3470154, "lng": 83.6320212 }, "SALEM": { "count": 5, "lat": 42.51954, "lng": -70.8967155 }, "VISAKHAPATNAM": { "count": 3, "lat": 17.6868159, "lng": 83.2184815 }, "GANJAM": { "count": 1, "lat": 19.387389, "lng": 85.0515413 }, "NAVSARI": { "count": 1, "lat": 20.9467019, "lng": 72.95203479999999 }, "MAYURBHANJ": { "count": 2, "lat": 22.0086978, "lng": 86.41873079999999 }, "HOOGHLY": { "count": 2, "lat": 22.9011588, "lng": 88.3898552 }, "BHADRAK": { "count": 1, "lat": 21.0573616, "lng": 86.4962996 }, "MYSURU": { "count": 4, "lat": 12.2958104, "lng": 76.6393805 }, "BAGALKOT": { "count": 1, "lat": 16.1691096, "lng": 75.6615029 }, "PURBA BARDHAMAN": { "count": 1, "lat": 23.2390023, "lng": 87.86945970000001 }, "GORAKHPUR": { "count": 1, "lat": 26.7605545, "lng": 83.3731675 }, "BANGALORE RURAL": { "count": 3, "lat": 13.2846993, "lng": 77.6077865 }, "BILASPUR(CGH)": { "count": 2 }, "K.V.RANGAREDDY": { "count": 11, "lat": 17.3891379, "lng": 77.8367282 }, "ANGUL": { "count": 1, "lat": 20.8444033, "lng": 85.1510818 }, "FARIDABAD": { "count": 2, "lat": 28.4089123, "lng": 77.3177894 }, "KRISHNA": { "count": 1, "lat": 29.6537668, "lng": -82.34070179999999 }, "VADODARA": { "count": 2, "lat": 22.3071588, "lng": 73.1812187 }, "GHAZIABAD": { "count": 2, "lat": 28.6691565, "lng": 77.45375779999999 }, "TIRUNELVELI": { "count": 2, "lat": 8.713912600000002, "lng": 77.7566523 }, "MOGA": { "count": 1, "lat": 35.1278982, "lng": -89.85541920000001 }, "SANGRUR": { "count": 1, "lat": 30.2457963, "lng": 75.8420716 }, "DEHRADUN": { "count": 2, "lat": 30.3164945, "lng": 78.03219179999999 }, "TIRUCHIRAPPALLI": { "count": 2, "lat": 10.7904833, "lng": 78.7046725 }, "RAICHUR": { "count": 1, "lat": 16.216018, "lng": 77.3565608 }, "AMRAVATI": { "count": 1, "lat": 20.9319821, "lng": 77.7523039 }, "PUNE": { "count": 3, "lat": 18.5204303, "lng": 73.8567437 }, "UDUPI": { "count": 1, "lat": 33.4480776, "lng": -111.9269809 }, "PANCHKULA": { "count": 2, "lat": 30.6942091, "lng": 76.860565 }, "AURAIYA": { "count": 1, "lat": 26.4605377, "lng": 79.5112528 }, "HASSAN": { "count": 1, "lat": 13.0033234, "lng": 76.1003894 }, "NAYAGARH": { "count": 1, "lat": 20.1231332, "lng": 85.1038426 }, "KANCHIPURAM": { "count": 5, "lat": 12.818456, "lng": 79.6946586 }, "KOZHIKODE": { "count": 2, "lat": 11.2587531, "lng": 75.78041 }, "GHAZIPUR": { "count": 1, "lat": 25.5877901, "lng": 83.5783078 }, "GAUTAM BUDDHA NAGAR": { "count": 3, "lat": 28.338333, "lng": 77.6077865 }, "RATLAM": { "count": 1, "lat": 23.3315103, "lng": 75.0366677 }, "VELLORE": { "count": 2, "lat": 12.9165167, "lng": 79.13249859999999 }, "JORHAT": { "count": 2, "lat": 26.7509207, "lng": 94.2036696 }, "CHANDIGARH": { "count": 2, "lat": 30.7333148, "lng": 76.7794179 }, "KANPUR NAGAR": { "count": 1, "lat": 26.4148245, "lng": 80.23213129999999 }, "ERODE": { "count": 1, "lat": 11.3410364, "lng": 77.7171642 }, "RAIGARH(MH)": { "count": 2 }, "JAMMU": { "count": 4, "lat": 32.7266016, "lng": 74.8570259 }, "UMARIA": { "count": 1, "lat": 23.5309797, "lng": 80.82947469999999 }, "SHIVAMOGGA": { "count": 3, "lat": 13.9299299, "lng": 75.568101 }, "MOHALI": { "count": 1, "lat": 30.7046486, "lng": 76.71787259999999 }, "SATARA": { "count": 2, "lat": 17.6804639, "lng": 74.018261 }, "PALAKKAD": { "count": 4, "lat": 10.7867303, "lng": 76.6547932 }, "MORADABAD": { "count": 1, "lat": 28.8386481, "lng": 78.7733286 }, "HOSHIARPUR": { "count": 1, "lat": 31.5143178, "lng": 75.911483 }, "KENDUJHAR": { "count": 1, "lat": 21.628933, "lng": 85.5816847 }, "NASHIK": { "count": 3, "lat": 19.9974533, "lng": 73.78980229999999 }, "UTTARA KANNADA": { "count": 2, "lat": 14.7937065, "lng": 74.6868815 }, "UNNAO": { "count": 2, "lat": 26.5393449, "lng": 80.4878195 }, "DIMAPUR": { "count": 1, "lat": 25.9091406, "lng": 93.72656049999999 }, "HAZARIBAG": { "count": 1, "lat": 23.9924669, "lng": 85.3636758 }, "PASCHIM BARDHAMAN": { "count": 1, "lat": 40.1072827, "lng": -74.9518154 }, "SAGAR": { "count": 1, "lat": 40.7491701, "lng": -73.8911988 }, "PAURI GARHWAL": { "count": 1, "lat": 29.8687682, "lng": 78.8382644 }, "KANNUR": { "count": 1, "lat": 11.8744775, "lng": 75.37036619999999 }, "MAHABUB NAGAR": { "count": 4, "lat": 16.7488379, "lng": 78.00351719999999 }, "JAJAPUR": { "count": 1, "lat": 20.8341019, "lng": 86.3326058 }, "SARAN": { "count": 2, "lat": 25.8559698, "lng": 84.8567932 }, "DIBRUGARH": { "count": 1, "lat": 27.4728327, "lng": 94.9119621 }, "GANGANAGAR": { "count": 1, "lat": 29.9093759, "lng": 73.87998050000002 }, "BHOPAL": { "count": 1, "lat": 23.2599333, "lng": 77.412615 }, "MUKTSAR": { "count": 1, "lat": 30.4761773, "lng": 74.5121599 }, "REWARI": { "count": 1, "lat": 28.1919738, "lng": 76.6190774 }, "PONDICHERRY": { "count": 2 }, "LUDHIANA": { "count": 1, "lat": 30.900965, "lng": 75.8572758 }, "GWALIOR": { "count": 1, "lat": 26.2182871, "lng": 78.18283079999999 }, "CUTTACK": { "count": 1, "lat": 20.462521, "lng": 85.8829895 }, "EAST SIKKIM": { "count": 1, "lat": 27.3083637, "lng": 88.6723578 }, "EAST MIDNAPORE": { "count": 1, "lat": 21.9372879, "lng": 87.77633329999999 }, "JAIPUR": { "count": 1, "lat": 41.232792, "lng": -96.08331199999999 }, "NIZAMABAD": { "count": 2, "lat": 18.6725047, "lng": 78.09408669999999 }, "BIKANER": { "count": 1, "lat": 28.0229348, "lng": 73.3119159 }, "DAHOD": { "count": 1, "lat": 22.8344992, "lng": 74.26061849999999 }, "DHANBAD": { "count": 1, "lat": 23.7956531, "lng": 86.43038589999999 }, "INDORE": { "count": 1, "lat": 22.7195687, "lng": 75.8577258 }, "KRISHNAGIRI": { "count": 1, "lat": 12.5265661, "lng": 78.2149575 }, "NALGONDA": { "count": 3, "lat": 17.0574663, "lng": 79.26841689999999 }, "NORTH GOA": { "count": 1, "lat": 15.5163112, "lng": 73.98300290000002 }, "KORAPUT": { "count": 1, "lat": 18.813487, "lng": 82.71233269999999 }, "TIRUVANNAMALAI": { "count": 1, "lat": 12.2252841, "lng": 79.07469569999999 }, "DAKSHINA KANNADA": { "count": 3, "lat": 12.8437814, "lng": 75.2479061 }, "JHANSI": { "count": 1, "lat": 25.4484257, "lng": 78.5684594 }, "PALI": { "count": 3, "lat": 34.2256512, "lng": -117.1331365 }, "MALAPPURAM": { "count": 1, "lat": 11.0509762, "lng": 76.0710967 }, "UDHAMPUR": { "count": 1, "lat": 32.9159847, "lng": 75.1416173 }, "OSMANABAD": { "count": 1, "lat": 18.185332, "lng": 76.0419642 }, "AKOLA": { "count": 1, "lat": 20.7002159, "lng": 77.0081678 }, "BANKURA": { "count": 1, "lat": 23.2312686, "lng": 87.07838749999999 }, "DINDIGUL": { "count": 1, "lat": 10.3623794, "lng": 77.9694579 }, "SONITPUR": { "count": 1, "lat": 26.6738851, "lng": 92.8577105 }, "NALANDA": { "count": 1, "lat": 40.7883072, "lng": -73.9675621 }, "WARANGAL": { "count": 1, "lat": 17.9689008, "lng": 79.59405439999999 }, "PURULIA": { "count": 1, "lat": 23.3322026, "lng": 86.3616405 }, "RAJGARH": { "count": 1, "lat": 24.0078819, "lng": 76.7278803 }, "BANKA": { "count": 1, "lat": 37.09024, "lng": -95.712891 }, "ALIGARH": { "count": 1, "lat": 27.8973944, "lng": 78.0880129 }, "SOLAN": { "count": 1, "lat": 30.9084245, "lng": 77.09990309999999 }, "SIBSAGAR": { "count": 1, "lat": 26.9826098, "lng": 94.6424521 }, "SATNA": { "count": 1, "lat": 24.6005075, "lng": 80.8322428 }, "IDUKKI": { "count": 1, "lat": 9.9188973, "lng": 77.10249019999999 }, "MAHESANA": { "count": 1, "lat": 23.5879607, "lng": 72.36932519999999 }, "GUNA": { "count": 1, "lat": 9.234439499999999, "lng": -78.19262499999999 }, "MEDAK": { "count": 3, "lat": 18.0529357, "lng": 78.261853 }, "KATIHAR": { "count": 1, "lat": 25.5540648, "lng": 87.5591073 }, "KULLU": { "count": 1, "lat": 31.959205, "lng": 77.1089377 }, "KARIM NAGAR": { "count": 1, "lat": 18.4385553, "lng": 79.1288412 }, "SUNDERGARH": { "count": 1, "lat": 22.1240025, "lng": 84.043175 }, "HARIDWAR": { "count": 1, "lat": 29.9456906, "lng": 78.16424780000001 }, "SIRSA": { "count": 1, "lat": 29.5320731, "lng": 75.03177339999999 }, "KACHCHH": { "count": 1, "lat": 23.7337326, "lng": 69.8597406 }, "WEST MIDNAPORE": { "count": 2, "lat": 22.4080376, "lng": 87.38107269999999 }, "HOWRAH": { "count": 2, "lat": 22.5957689, "lng": 88.26363940000002 }, "TIRUVALLUR": { "count": 1, "lat": 13.2544335, "lng": 80.0087746 }, "DURG": { "count": 1, "lat": 21.1904494, "lng": 81.2849169 }, "SOUTH GOA": { "count": 1, "lat": 15.11766, "lng": 74.12399599999999 } } }, "todayOrderCount": { "stateCount": { "TAMIL NADU": { "count": 7, "lat": 11.1271225, "lng": 78.6568942 }, "KARNATAKA": { "count": 5, "lat": 15.3172775, "lng": 75.7138884 }, "JHARKHAND": { "count": 1, "lat": 23.6101808, "lng": 85.2799354 }, "TELANGANA": { "count": 5, "lat": 18.1124372, "lng": 79.01929969999999 }, "ANDHRA PRADESH": { "count": 8, "lat": 15.9128998, "lng": 79.7399875 }, "WEST BENGAL": { "count": 2, "lat": 22.9867569, "lng": 87.8549755 }, "ODISHA": { "count": 2, "lat": 20.9516658, "lng": 85.0985236 }, "BIHAR": { "count": 4, "lat": 25.0960742, "lng": 85.31311939999999 }, "DELHI": { "count": 3, "lat": 28.7040592, "lng": 77.10249019999999 }, "PUNJAB": { "count": 1, "lat": 31.1471305, "lng": 75.34121789999999 }, "KERALA": { "count": 4, "lat": 10.8505159, "lng": 76.2710833 }, "MAHARASHTRA": { "count": 4, "lat": 19.7514798, "lng": 75.7138884 }, "HARYANA": { "count": 1, "lat": 29.0587757, "lng": 76.085601 }, "UTTARAKHAND": { "count": 1, "lat": 30.066753, "lng": 79.01929969999999 }, "UTTAR PRADESH": { "count": 2, "lat": 26.8467088, "lng": 80.9461592 }, "UP": { "count": 1 } }, "distCount": {} } }
    { id: 'Andhra Pradesh', state: 'Andhra Pradesh', value: 45 },
    { id: 'Arunachal Pradesh', state: 'Arunachal Pradesh', value: 45 },
    { id: 'Assam', state: 'Assam', value: 45 },
    { id: 'Bihar', state: 'Bihar', value: 45 },
    { id: 'Chhattisgarh', state: 'Chhattisgarh', value: 45 },
    { id: 'Goa', state: 'Goa', value: 110 },
    { id: 'Gujarat', state: 'Gujarat', value: 22 },
    { id: 'Haryana', state: 'Haryana', value: 45 },
    { id: 'Himachal Pradesh', state: 'Himachal Pradesh', value: 24 },
    { id: 'Jharkhand', state: 'Jharkhand', value: 26 },
    { id: 'Karnataka', state: 'Karnataka', value: 27 },
    { id: 'Kerala', state: 'Kerala', value: 45 },
    { id: 'Madhya Pradesh', state: 'Madhya Pradesh', value: 45 },
    { id: 'Maharashtra', state: 'Maharashtra', value: 45 },
    { id: 'Manipur', state: 'Manipur', value: 45 },
    { id: 'Meghalaya', state: 'Meghalaya', value: 59 },
    { id: 'Mizoram', state: 'Mizoram', value: 45 },
    { id: 'Nagaland', state: 'Nagaland', value: 59 },
    { id: 'Odisha', state: 'Odisha', value: 59 },
    { id: 'Punjab', state: 'Punjab', value: 78 },
    { id: 'Rajasthan', state: 'Rajasthan', value: 45 },
    { id: 'Sikkim', state: 'Sikkim', value: 45 },
    { id: 'Tamil Nadu', state: 'Tamil Nadu', value: 45 },
    { id: 'Telangana', state: 'Telangana', value: 45 },
    { id: 'Tripura', state: 'Tripura', value: 14 },
    { id: 'Uttarakhand', state: 'Uttarakhand', value: 45 },
    { id: 'Uttar Pradesh', state: 'Uttar Pradesh', value: 15 },
    { id: 'West Bengal', state: 'West Bengal', value: 17 },
    { id: 'Andaman & Nicobar Island', state: 'Andaman & Nicobar Island', value: 45 },
    { id: 'Chandigarh', state: 'Chandigarh', value: 45 },
    { id: 'Dadra and Nagar Haveli', state: 'Dadra and Nagar Haveli', value: 19 },
    { id: 'Daman and Diu', state: 'Daman and Diu', value: 20 },
    { id: 'Delhi', state: 'Delhi', value: 59 },
    { id: 'Jammu & Kashmir', state: 'Jammu & Kashmir', value: 25 },
    { id: 'Ladakh', state: 'Ladakh', value: 45 },
    { id: 'Lakshadweep', state: 'Lakshadweep', value: 45 },
    { id: 'Puducherry', state: 'Puducherry', value: 45 }
  ];
};
const MapChart = ({ setTooltipContent, setStateName, setStateValue, setShowDistrict }) => {
  const [data, setData] = useState(getHeatMapData());
  const colorScale = scaleQuantile()
    .domain(
      data.map(
        d =>
          // console.log(d.value, "count only")
          d.value
      )
    )
    .range(COLOR_RANGE);
  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce(
      (max, item) =>
        //console.log(item.value,"count only")
        item.value > max ? item.value : max,
      0
    )
  };
  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    // console.log(current,"res value count")
    return () => {
      setTooltipContent(`${geo.properties.ST_NM}: ${current.value}`);
    };
  };
  const onMouseLeave = () => {
    setTooltipContent('');
  };
  return (
    <>
      <ComposableMap data-tip="" projection="geoMercator" width={180} height={180} projectionConfig={{ scale: 220 }}>
        <ZoomableGroup zoom={1} center={[80, 22]}>
          <Geographies geography={india}>
            {({ geographies }) =>
              geographies.map(geo => {

                const current = data.find(
                  s =>
                    //  console.log(s.id,"id name ex TN")
                    s.id === geo.properties.ST_NM
                )
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                    onClick={() => {
                      const { ST_NM } = geo.properties;
                      setStateName(`${ST_NM}`);
                      setShowDistrict(true);
                    }}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapChart;