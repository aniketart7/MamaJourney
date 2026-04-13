import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";
import { WeekData } from "@/data/pregnancyData";

interface WeekCardProps {
  weekData: WeekData;
  onPress: () => void;
  isCurrentWeek?: boolean;
}

export function WeekCard({ weekData, onPress, isCurrentWeek }: WeekCardProps) {
  const c = colors.light;
  const trimesterColor =
    weekData.trimester === 1
      ? "#e8608a"
      : weekData.trimester === 2
      ? "#9b6db5"
      : "#5b8fd6";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: c.card, borderColor: isCurrentWeek ? trimesterColor : c.border },
        isCurrentWeek && styles.currentCard,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.weekBadge, { backgroundColor: trimesterColor + "20" }]}>
        <Text style={[styles.weekNumber, { color: trimesterColor }]}>{weekData.week}</Text>
        <Text style={[styles.weekLabel, { color: trimesterColor }]}>wk</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.sizeText, { color: c.foreground }]}>
          {weekData.fetalSizeComparison}
        </Text>
        <Text style={[styles.highlightText, { color: c.mutedForeground }]} numberOfLines={2}>
          {weekData.weekHighlight}
        </Text>
      </View>
      {isCurrentWeek && (
        <View style={[styles.currentBadge, { backgroundColor: trimesterColor }]}>
          <Text style={styles.currentBadgeText}>Now</Text>
        </View>
      )}
      <Feather name="chevron-right" size={18} color={c.mutedForeground} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    borderWidth: 1.5,
    gap: 12,
  },
  currentCard: {
    borderWidth: 2,
  },
  weekBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  weekNumber: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  weekLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    gap: 3,
  },
  sizeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  highlightText: {
    fontSize: 12,
    lineHeight: 16,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  currentBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
