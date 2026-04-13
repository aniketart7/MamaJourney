import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { WeekCard } from "@/components/WeekCard";
import { usePregnancy } from "@/context/PregnancyContext";
import { WeekData, pregnancyData } from "@/data/pregnancyData";

const TRIMESTER_COLORS = ["#e8608a", "#9b6db5", "#5b8fd6"];
const TRIMESTER_LABELS = ["First Trimester", "Second Trimester", "Third Trimester"];
const TRIMESTER_WEEKS = ["Weeks 1-12", "Weeks 13-27", "Weeks 28-40"];

interface Section {
  title: string;
  subtitle: string;
  color: string;
  data: WeekData[];
}

const sections: Section[] = [
  {
    title: "First Trimester",
    subtitle: "Weeks 1-12",
    color: "#e8608a",
    data: pregnancyData.filter((d) => d.trimester === 1),
  },
  {
    title: "Second Trimester",
    subtitle: "Weeks 13-27",
    color: "#9b6db5",
    data: pregnancyData.filter((d) => d.trimester === 2),
  },
  {
    title: "Third Trimester",
    subtitle: "Weeks 28-40",
    color: "#5b8fd6",
    data: pregnancyData.filter((d) => d.trimester === 3),
  },
];

export default function JourneyScreen() {
  const insets = useSafeAreaInsets();
  const c = colors.light;
  const { currentWeek, setCurrentWeek } = usePregnancy();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleWeekPress = (week: number) => {
    setCurrentWeek(week);
    router.push({ pathname: "/week/[week]", params: { week: week.toString() } });
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 16, backgroundColor: "#9b6db5" },
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Pregnancy Journey</Text>
            <Text style={styles.headerSubtitle}>All 40 Weeks</Text>
          </View>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.week.toString()}
        contentContainerStyle={{ paddingBottom: bottomPad + 100 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              { borderLeftColor: section.color },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: section.color }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionSubtitle, { color: c.mutedForeground }]}>
              {section.subtitle}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <WeekCard
            weekData={item}
            onPress={() => handleWeekPress(item.week)}
            isCurrentWeek={item.week === currentWeek}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  headerContent: {
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
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    marginTop: 2,
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 12,
    borderLeftWidth: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});
