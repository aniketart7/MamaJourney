import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "@/constants/colors";
import { WeekData } from "@/data/pregnancyData";

interface FetalVisualProps {
  weekData: WeekData;
}

const SIZE_MAP: Record<number, number> = {
  1: 8, 2: 10, 3: 12, 4: 14, 5: 16, 6: 18, 7: 20, 8: 22, 9: 25, 10: 28,
  11: 32, 12: 36, 13: 42, 14: 48, 15: 55, 16: 62, 17: 70, 18: 78, 19: 86, 20: 94,
  21: 100, 22: 108, 23: 115, 24: 122, 25: 128, 26: 134, 27: 140, 28: 146, 29: 150, 30: 155,
  31: 158, 32: 161, 33: 164, 34: 167, 35: 170, 36: 173, 37: 176, 38: 178, 39: 180, 40: 182,
};

const FRUITS: Record<string, string> = {
  "Poppy seed": "•",
  "Sesame seed": "·",
  "Lentil": "◉",
  "Blueberry": "●",
  "Raspberry": "●",
  "Grape": "◉",
  "Strawberry": "▲",
  "Fig": "▲",
  "Plum": "◉",
  "Lemon": "⬭",
  "Peach": "◉",
  "Apple": "◉",
  "Avocado": "⬬",
  "Turnip": "⬬",
  "Mango": "⬬",
  "Heirloom tomato": "◉",
  "Banana": "⌢",
  "Carrot": "⌄",
  "Papaya": "⬬",
  "Large mango": "⬬",
  "Ear of corn": "⌂",
  "Head of lettuce": "◎",
  "Cauliflower": "◎",
  "Eggplant": "⬬",
  "Butternut squash": "⬬",
  "Cantaloupe": "◉",
  "Large cabbage": "◉",
  "Coconut": "◉",
  "Jicama": "◉",
  "Pineapple": "⌂",
  "Honeydew melon": "◉",
  "Romaine lettuce": "⬬",
  "Winter melon": "◉",
  "Leek": "⌂",
  "Mini watermelon": "◉",
  "Small pumpkin": "◉",
};

export function FetalVisual({ weekData }: FetalVisualProps) {
  const c = colors.light;
  const visualSize = SIZE_MAP[weekData.week] || 50;
  const clampedSize = Math.min(Math.max(visualSize, 8), 182);

  const trimesterColor =
    weekData.trimester === 1
      ? "#e8608a"
      : weekData.trimester === 2
      ? "#9b6db5"
      : "#5b8fd6";

  const progressPercent = (weekData.week / 40) * 100;

  return (
    <View style={[styles.container, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={styles.visual}>
        <View style={[styles.womb, { borderColor: trimesterColor + "30" }]}>
          <View
            style={[
              styles.baby,
              {
                width: clampedSize,
                height: clampedSize,
                backgroundColor: trimesterColor + "15",
                borderColor: trimesterColor + "60",
              },
            ]}
          />
        </View>
        <View style={styles.info}>
          <Text style={[styles.sizeLabel, { color: c.mutedForeground }]}>Size of a</Text>
          <Text style={[styles.sizeName, { color: trimesterColor }]}>
            {weekData.fetalSizeComparison}
          </Text>
          <View style={styles.measurements}>
            <View style={styles.measurement}>
              <Text style={[styles.measureValue, { color: c.foreground }]}>
                {weekData.fetalLength}
              </Text>
              <Text style={[styles.measureLabel, { color: c.mutedForeground }]}>length</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: c.border }]} />
            <View style={styles.measurement}>
              <Text style={[styles.measureValue, { color: c.foreground }]}>
                {weekData.fetalWeight}
              </Text>
              <Text style={[styles.measureLabel, { color: c.mutedForeground }]}>weight</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: c.mutedForeground }]}>
            Pregnancy Progress
          </Text>
          <Text style={[styles.progressPercent, { color: trimesterColor }]}>
            {Math.round(progressPercent)}%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: c.muted }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercent}%` as unknown as number, backgroundColor: trimesterColor },
            ]}
          />
        </View>
        <View style={styles.trimesterLabels}>
          <Text style={[styles.trimLabel, { color: c.mutedForeground }]}>T1</Text>
          <Text style={[styles.trimLabel, { color: c.mutedForeground }]}>T2</Text>
          <Text style={[styles.trimLabel, { color: c.mutedForeground }]}>T3</Text>
          <Text style={[styles.trimLabel, { color: c.mutedForeground }]}>Birth</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 20,
  },
  visual: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  womb: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  baby: {
    borderRadius: 999,
    borderWidth: 2,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  sizeLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  sizeName: {
    fontSize: 20,
    fontWeight: "700",
  },
  measurements: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  measurement: {
    alignItems: "center",
  },
  measureValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  measureLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 28,
    borderRadius: 1,
  },
  progressSection: {
    gap: 6,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  trimesterLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trimLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
});
