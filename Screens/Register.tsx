import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  Animated,
  StatusBar,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import TermsModal from "../components/TermsModal";

const Register = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Date picker values
  const [selectedDay, setSelectedDay] = useState("4");
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2022");

  const slideAnimation = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  // Keyboard handling
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => {
        setKeyboardVisible(true);
        // Animate the button to hide
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNext = () => {
    // Basic validation
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!phoneNumber.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    if (!gender) {
      alert("Please select your gender");
      return;
    }
    if (!dateOfBirth) {
      alert("Please select your date of birth");
      return;
    }

    setShowTerms(true);
  };

  const handleAgreeTerms = () => {
    setShowTerms(false);

    const userData = {
      fullName,
      phoneNumber,
      email,
      gender,
      dateOfBirth,
    };

    console.log("Registration data:", userData);

    navigation.navigate("CreatePin", { userData });
  };

  const handleDateSelect = () => {
    setDateOfBirth(`${selectedDay} ${selectedMonth} ${selectedYear}`);
    setShowDatePicker(false);
  };

  const showDatePickerModal = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideDatePickerModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowDatePicker(false));
  };

  return (
    <LinearGradient
      colors={["#121212", "#001211", "#013d39", "#01665f"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#121212" barStyle="light-content" />
        <View style={styles.topSpacer} />

        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make your m.tix account</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Registration form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "Male" && styles.selectedGender,
                  ]}
                  onPress={() => setGender("Male")}
                >
                  <View
                    style={[
                      styles.radioButton,
                      gender === "Male" && styles.radioButtonSelected,
                    ]}
                  >
                    {gender === "Male" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === "Female" && styles.selectedGender,
                  ]}
                  onPress={() => setGender("Female")}
                >
                  <View
                    style={[
                      styles.radioButton,
                      gender === "Female" && styles.radioButtonSelected,
                    ]}
                  >
                    {gender === "Female" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={showDatePickerModal}
              >
                <Text
                  style={[
                    styles.dateText,
                    !dateOfBirth && styles.placeholderText,
                  ]}
                >
                  {dateOfBirth || "Select date of birth"}
                </Text>
                <Ionicons name="calendar-outline" size={22} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.extraBottomPadding} />
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.nextButtonContainer,
            { opacity: buttonOpacity },
            keyboardVisible && styles.hidden,
          ]}
          pointerEvents={keyboardVisible ? "none" : "auto"}
        >
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Date Picker Bottom Drawer */}
        {showDatePicker && (
          <Modal
            transparent={true}
            visible={showDatePicker}
            animationType="none"
            onRequestClose={hideDatePickerModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={hideDatePickerModal}
            >
              <Animated.View
                style={[
                  styles.datePickerContainer,
                  {
                    transform: [
                      {
                        translateY: slideAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [300, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.datePickerHeader}>
                  <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={hideDatePickerModal}
                  >
                    <Ionicons name="chevron-back" size={28} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.datePickerTitle}>Date of birth</Text>
                </View>

                <View style={styles.dateSelection}>
                  {/* Day selection */}
                  <View style={styles.dateColumn}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(
                        (day) => (
                          <TouchableOpacity
                            key={day}
                            style={[
                              styles.dateOption,
                              day === selectedDay && styles.selectedDateOption,
                            ]}
                            onPress={() => setSelectedDay(day)}
                          >
                            <Text
                              style={[
                                styles.dateOptionText,
                                day === selectedDay &&
                                  styles.selectedDateOptionText,
                              ]}
                            >
                              {day}
                            </Text>
                          </TouchableOpacity>
                        )
                      )}
                    </ScrollView>
                  </View>

                  {/* Month selection */}
                  <View style={styles.dateColumn}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <TouchableOpacity
                          key={month}
                          style={[
                            styles.dateOption,
                            month === selectedMonth &&
                              styles.selectedDateOption,
                          ]}
                          onPress={() => setSelectedMonth(month)}
                        >
                          <Text
                            style={[
                              styles.dateOptionText,
                              month === selectedMonth &&
                                styles.selectedDateOptionText,
                            ]}
                          >
                            {month}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Year selection */}
                  <View style={styles.dateColumn}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 100 }, (_, i) =>
                        String(2025 - i)
                      ).map((year) => (
                        <TouchableOpacity
                          key={year}
                          style={[
                            styles.dateOption,
                            year === selectedYear && styles.selectedDateOption,
                          ]}
                          onPress={() => setSelectedYear(year)}
                        >
                          <Text
                            style={[
                              styles.dateOptionText,
                              year === selectedYear &&
                                styles.selectedDateOptionText,
                            ]}
                          >
                            {year}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleDateSelect}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Terms and Conditions Modal */}
        <TermsModal
          visible={showTerms}
          onClose={() => setShowTerms(false)}
          onAgree={handleAgreeTerms}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  topSpacer: {
    height: Platform.OS === "ios" ? 10 : 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  genderContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  selectedGender: {
    opacity: 1,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: "#4ECDC4",
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4ECDC4",
  },
  genderText: {
    color: "white",
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  placeholderText: {
    color: "#999",
  },
  extraBottomPadding: {
    height: 80,
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#01665f",
    fontSize: 16,
    fontWeight: "bold",
  },
  hidden: {
    opacity: 0,
    display: "none",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  datePickerContainer: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "60%",
  },
  datePickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  datePickerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  dateSelection: {
    flexDirection: "row",
    flex: 1,
  },
  dateColumn: {
    flex: 1,
    paddingVertical: 10,
  },
  dateOption: {
    paddingVertical: 15,
    alignItems: "center",
  },
  selectedDateOption: {
    borderBottomWidth: 2,
    borderBottomColor: "#4ECDC4",
  },
  dateOptionText: {
    color: "white",
    fontSize: 16,
  },
  selectedDateOptionText: {
    color: "#4ECDC4",
    fontWeight: "bold",
  },
  agreeButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  agreeButtonText: {
    color: "#01665f",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Register;
