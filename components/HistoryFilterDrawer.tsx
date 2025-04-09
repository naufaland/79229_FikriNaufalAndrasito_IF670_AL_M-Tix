import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Add this import

interface HistoryFilterDrawerProps {
  isVisible: boolean;
  selectedFilter: string;
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
}

const HistoryFilterDrawer: React.FC<HistoryFilterDrawerProps> = ({
  isVisible,
  selectedFilter,
  onClose,
  onSelectFilter,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const drawerHeight = 235;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleSelectFilter = (filter: string) => {
    onSelectFilter(filter);
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.filterDrawer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      screenHeight,
                      screenHeight - drawerHeight - 50,
                    ],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.drawerHandle} />

          <View style={styles.drawerHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              {/* Replace text with Ionicons */}
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.drawerTitle}>Show history order for</Text>
          </View>

          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => handleSelectFilter("This month")}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedFilter === "This month" && styles.selectedFilterText,
              ]}
            >
              This month
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => handleSelectFilter("Last month")}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedFilter === "Last month" && styles.selectedFilterText,
              ]}
            >
              Last month
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => handleSelectFilter("Over 2 months")}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedFilter === "Over 2 months" && styles.selectedFilterText,
              ]}
            >
              Over 2 months
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  filterDrawer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#000000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  drawerHandle: {
    width: 40,
    height: 3,
    backgroundColor: "#5E5E5E",
    alignSelf: "center",
    marginBottom: 20,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  closeButton: {
    marginRight: 15,
    padding: 3,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  filterOption: {
    paddingVertical: 15,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#FFF",
  },
  selectedFilterText: {
    color: "#4CD2C0",
  },
  divider: {
    height: 1,
    backgroundColor: "#333333",
    marginLeft: -20,
    marginRight: -20,
  },
});

export default HistoryFilterDrawer;
