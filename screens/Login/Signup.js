import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../../services/api';
import AuthContext from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';


const Signup = () => {
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  }
  const { setAuthenticated } = useContext(AuthContext);

  const [FirstName, setFirstName] = useState('');
  const [MiddleName, setMiddleName] = useState('');
  const [LastName, setLastName] = useState('');
  const [BirthYear, setBirthYear] = useState('');
  const [BirthMonth, setBirthMonth] = useState('');
  const [BirthDay, setBirthDay] = useState('');
  const [GenderID, setGenderID] = useState('');
  const [Address, setAddress] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ReligionType, setReligionType] = useState('');

  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const genderIDRef = useRef();
  const addressRef = useRef();
  const contactNoRef = useRef();
  const birthdayRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const religionTypeRef = useRef();

  const handleSignUp = async () => {
    if (Password !== ConfirmPassword) {
      Alert.alert('Error', 'Password and Confirm Password do not match.');
      return;
    }

    const birthdate = `${BirthYear}-${BirthMonth}-${BirthDay}`;

    const data = {
      FirstName,
      MiddleName,
      LastName,
      Birthdate: birthdate,
      GenderID,
      Address,
      ContactNo,
      Email,
      Password,
      ReligionType: ReligionType === 'Roman Catholic' ? 1 : 0,
      TransactBy: 1,
      include_user_info: true,
    };

    try {
      const response = await postData('/signup/cheffies', data);
      const responseData = response.data;
    
      if (responseData.code === 200) {
        if (responseData.data && responseData.data.length > 0) {
          const firstError = responseData.data[0];
    
          if (firstError.IsSuccess === '1') {
            // Registration was successful
            Alert.alert('Success', 'Registration was successful!');
            navigation.navigate('Login');
          } else if (firstError.Result) {
            // Handle registration failure
            Alert.alert('Error', firstError.Result);
          }
        } else {
          // Handle unexpected response
          Alert.alert('Error', 'An error occurred during sign up.');
        }
      } else {
        // Handle unexpected response
        Alert.alert('Error', 'An error occurred during sign up.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An error occurred during sign up.');
    }
    
    
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = currentDate.getDate().toString().padStart(2, '0');

    setBirthYear(currentYear.toString());
    setBirthMonth(currentMonth);
    setBirthDay(currentDay);
  }, []);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => (currentYear - 99) + index);
    return years;
  };

  const generateMonths = () => {
    const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
    return months;
  };

  const generateDays = () => {
    const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'));
    return days;
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={FirstName}
        returnKeyType="next"
        onSubmitEditing={() => middleNameRef.current.focus()}
      />

      {/* <TextInput
        ref={middleNameRef}
        style={styles.input}
        placeholder="Middle Name"
        onChangeText={setMiddleName}
        value={MiddleName}
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current.focus()}
      /> */}

      <TextInput
        ref={lastNameRef}
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={LastName}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()}
      />

      {/* <TextInput
        ref={addressRef}
        style={styles.input}
        placeholder="Address"
        onChangeText={setAddress}
        value={Address}
        returnKeyType="next"
        onSubmitEditing={() => contactNoRef.current.focus()}
      /> */}

      {/* <TextInput
        ref={contactNoRef}
        style={styles.input}
        placeholder="Contact Number"
        onChangeText={setContactNo}
        value={ContactNo}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()}
      /> */}

      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="Mobile number or email"
        onChangeText={setEmail || setContactNo}
        value={Email}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />

      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={Password}
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordRef.current.focus()}
      />

      <TextInput
        ref={confirmPasswordRef}
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={ConfirmPassword}
        returnKeyType="next"
        
      />

      <View style={styles.datePickerContainer}>
        <Picker
          style={styles.datePicker}
          selectedValue={BirthYear}
          onValueChange={(itemValue) => setBirthYear(itemValue)}
        >
          <Picker.Item label="Year" value="" />
          {generateYears().map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
          ))}
        </Picker>

        <Picker
          style={styles.datePicker}
          selectedValue={BirthMonth}
          onValueChange={(itemValue) => setBirthMonth(itemValue)}
        >
          <Picker.Item label="Month" value="" />
          {generateMonths().map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>

        <Picker
          style={styles.datePicker}
          selectedValue={BirthDay}
          onValueChange={(itemValue) => setBirthDay(itemValue)}
        >
          <Picker.Item label="Day" value="" />
          {generateDays().map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
      </View>
      
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGenderID('male')}
        >
          <RadioButton.Android
            status={GenderID === 'male' ? 'checked' : 'unchecked'}
            color="#007AFF" 
          />
          <Text style={styles.radioLabel}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGenderID('female')}
        >
          <RadioButton.Android
            status={GenderID === 'female' ? 'checked' : 'unchecked'}
            color="#007AFF" 
          />
          <Text style={styles.radioLabel}>Female</Text>
        </TouchableOpacity>
      </View>
      
      
      <Picker
        ref={religionTypeRef}
        style={styles.picker}
        selectedValue={ReligionType}
        onValueChange={(itemValue) => setReligionType(itemValue)}
      >
        <Picker.Item label="Select Religion" value="" />
        <Picker.Item label="Roman Catholic" value="Roman Catholic" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
   

      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={{ fontSize: 18, color: "#2D5926", fontWeight: "700" }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 35 }}>
        <Text style={{ fontSize: 18 }}>Already have an account? </Text>
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={{ fontSize: 18, color: '#2D5926', textAlign: 'center'  }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5ECC3',
    padding: 5,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 30,
    marginTop: -45,
    marginLeft: 100
  },
  title: {
    fontSize: 19,
    marginBottom: 30,
    marginTop: -30
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 8,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around',  
  },
  datePicker: {
    margin: 2, 
    // padding: 15, 
    height: 33,
    width: 105,
    // alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: '#FFFFFF'
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
  picker: {
    margin: 10, 
    padding: 18, 
    height: 5,
    width: 300,
    // alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
    marginRight: 120,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 17
  },
  button: {
    backgroundColor: "#8AD77E",
    borderRadius: 40,
    paddingVertical: 11,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    color:"#000000"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
