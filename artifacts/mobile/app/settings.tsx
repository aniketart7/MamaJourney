import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { usePregnancy } from "@/context/PregnancyContext";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const c = colors.light;
  const {
    currentWeek,
    setCurrentWeek,
    momName,
    setMomName,
    dadName,
    setDadName,
    babyName,
    setBabyName,
  } = usePregnancy();

  const [tempMom, setTempMom] = useState(momName);
  const [tempDad, setTempDad] = useState(dadName);
  const [tempBaby, setTempBaby] = useState(babyName);
  const [tempWeek, setTempWeek] = useState(currentWeek.toString());

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSave = () => {
    const week = parseInt(tempWeek, 10);
    if (isNaN(week) || week < 1 || week > 40) {
      Alert.alert("Invalid week", "Please enter a week between 1 and 40");
      return;
    }
    setMomName(tempMom);
    setDadName(tempDad);
    setBabyName(tempBaby || "Baby");
    setCurrentWeek(week);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad + 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.header, { paddingTop: topPad + 16, backgroundColor: "#e8608a" }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.mutedForeground }]}>YOUR JOURNEY</Text>

        <View style={[styles.field, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.fieldLabel, { color: c.mutedForeground }]}>Current Week</Text>
          <View style={styles.weekSelector}>
            <TouchableOpacity
              style={[styles.weekBtn, { backgroundColor: "#e8608a" + "20" }]}
              onPress={() => {
                const w = Math.max(1, parseInt(tempWeek, 10) - 1);
                setTempWeek(w.toString());
              }}
            >
              <Feather name="minus" size={18} color="#e8608a" />
            </TouchableOpacity>
            <Text style={[styles.weekValue, { color: c.foreground }]}>Week {tempWeek}</Text>
            <TouchableOpacity
              style={[styles.weekBtn, { backgroundColor: "#e8608a" + "20" }]}
              onPress={() => {
                const w = Math.min(40, parseInt(tempWeek, 10) + 1);
                setTempWeek(w.toString());
              }}
            >
              <Feather name="plus" size={18} color="#e8608a" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.mutedForeground }]}>PERSONALIZE</Text>

        <View style={[styles.inputCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={styles.inputRow}>
            <Feather name="heart" size={18} color="#e8608a" style={styles.inputIcon} />
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: c.mutedForeground }]}>Mom's Name</Text>
              <TextInput
                style={[styles.input, { color: c.foreground }]}
                value={tempMom}
                onChangeText={setTempMom}
                placeholder="Enter mom's name"
                placeholderTextColor={c.mutedForeground}
              />
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: c.border }]} />
          <View style={styles.inputRow}>
            <Feather name="user" size={18} color="#5b8fd6" style={styles.inputIcon} />
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: c.mutedForeground }]}>Dad's Name</Text>
              <TextInput
                style={[styles.input, { color: c.foreground }]}
                value={tempDad}
                onChangeText={setTempDad}
                placeholder="Enter dad's name"
                placeholderTextColor={c.mutedForeground}
              />
            </View>
          </View>
          <View style={[styles.separator, { backgroundColor: c.border }]} />
          <View style={styles.inputRow}>
            <Feather name="star" size={18} color="#6db58a" style={styles.inputIcon} />
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: c.mutedForeground }]}>Baby's Name</Text>
              <TextInput
                style={[styles.input, { color: c.foreground }]}
                value={tempBaby}
                onChangeText={setTempBaby}
                placeholder="Enter baby's name"
                placeholderTextColor={c.mutedForeground}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.mutedForeground }]}>ABOUT</Text>
        <View style={[styles.aboutCard, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.aboutTitle, { color: c.foreground }]}>Pregnancy Journey</Text>
          <Text style={[styles.aboutText, { color: c.mutedForeground }]}>
            Your week-by-week companion for both mom and dad. Track fetal development, understand
            symptoms, and build a stronger bond through every step of this beautiful journey.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  saveBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  field: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 12,
  },
  weekSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weekBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  weekValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  inputCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  inputIcon: {
    flexShrink: 0,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    fontSize: 15,
    fontWeight: "500",
    padding: 0,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
  },
  aboutCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
