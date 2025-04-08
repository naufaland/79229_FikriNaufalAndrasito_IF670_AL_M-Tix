import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TermsDrawerProps {
  visible: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const TermsDrawer = ({ visible, onClose, onAgree }: TermsDrawerProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.termsModalContainer}>
        <View style={styles.termsModalContent}>
          <View style={styles.termsHeader}>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.termsTitle}>Account Terms</Text>
          </View>

          <View style={styles.termsIconContainer}>
            <Ionicons name="document-text" size={50} color="#F5A623" />
          </View>

          <Text style={styles.termsText}>
            To keep going, please agree to m.tix{" "}
            <Text style={styles.termsLink}>Terms of service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy policy</Text>
          </Text>

          <TouchableOpacity style={styles.agreeButton} onPress={onAgree}>
            <Text style={styles.agreeButtonText}>Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  termsModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  termsModalContent: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "40%",
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  termsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  termsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  termsIconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  termsText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  termsLink: {
    color: "#4ECDC4",
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

export default TermsDrawer;
