import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";

interface SectionCardProps {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  accentColor: string;
  items: string[];
  collapsed?: boolean;
}

export function SectionCard({
  title,
  icon,
  accentColor,
  items,
  collapsed: initialCollapsed = false,
}: SectionCardProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const c = colors.light;

  return (
    <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setCollapsed(!collapsed)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconBg, { backgroundColor: accentColor + "20" }]}>
          <Feather name={icon} size={18} color={accentColor} />
        </View>
        <Text style={[styles.title, { color: c.foreground }]}>{title}</Text>
        <Feather
          name={collapsed ? "chevron-down" : "chevron-up"}
          size={18}
          color={c.mutedForeground}
        />
      </TouchableOpacity>

      {!collapsed && (
        <View style={styles.items}>
          {items.map((item, i) => (
            <View key={i} style={styles.item}>
              <View style={[styles.dot, { backgroundColor: accentColor }]} />
              <Text style={[styles.itemText, { color: c.foreground }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
  },
  items: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
