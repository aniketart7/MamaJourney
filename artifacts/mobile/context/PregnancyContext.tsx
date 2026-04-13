import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PregnancyContextType {
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
  dueDate: Date | null;
  setDueDate: (date: Date) => void;
  momName: string;
  setMomName: (name: string) => void;
  dadName: string;
  setDadName: (name: string) => void;
  babyName: string;
  setBabyName: (name: string) => void;
  isSetup: boolean;
  completeSetup: () => void;
}

const PregnancyContext = createContext<PregnancyContextType | undefined>(
  undefined
);

const STORAGE_KEY = "@pregnancy_data";

export function PregnancyProvider({ children }: { children: React.ReactNode }) {
  const [currentWeek, setCurrentWeekState] = useState<number>(8);
  const [dueDate, setDueDateState] = useState<Date | null>(null);
  const [momName, setMomNameState] = useState<string>("");
  const [dadName, setDadNameState] = useState<string>("");
  const [babyName, setBabyNameState] = useState<string>("Baby");
  const [isSetup, setIsSetup] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          if (data.currentWeek) setCurrentWeekState(data.currentWeek);
          if (data.dueDate) setDueDateState(new Date(data.dueDate));
          if (data.momName) setMomNameState(data.momName);
          if (data.dadName) setDadNameState(data.dadName);
          if (data.babyName) setBabyNameState(data.babyName);
          if (data.isSetup) setIsSetup(data.isSetup);
        }
      } catch (e) {
        // ignore
      }
    };
    load();
  }, []);

  const save = useCallback(
    async (updates: Record<string, unknown>) => {
      try {
        const current: Record<string, unknown> = {
          currentWeek,
          dueDate: dueDate?.toISOString(),
          momName,
          dadName,
          babyName,
          isSetup,
        };
        const merged = { ...current, ...updates };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        // ignore
      }
    },
    [currentWeek, dueDate, momName, dadName, babyName, isSetup]
  );

  const setCurrentWeek = useCallback(
    (week: number) => {
      setCurrentWeekState(week);
      save({ currentWeek: week });
    },
    [save]
  );

  const setDueDate = useCallback(
    (date: Date) => {
      setDueDateState(date);
      save({ dueDate: date.toISOString() });
    },
    [save]
  );

  const setMomName = useCallback(
    (name: string) => {
      setMomNameState(name);
      save({ momName: name });
    },
    [save]
  );

  const setDadName = useCallback(
    (name: string) => {
      setDadNameState(name);
      save({ dadName: name });
    },
    [save]
  );

  const setBabyName = useCallback(
    (name: string) => {
      setBabyNameState(name);
      save({ babyName: name });
    },
    [save]
  );

  const completeSetup = useCallback(() => {
    setIsSetup(true);
    save({ isSetup: true });
  }, [save]);

  return (
    <PregnancyContext.Provider
      value={{
        currentWeek,
        setCurrentWeek,
        dueDate,
        setDueDate,
        momName,
        setMomName,
        dadName,
        setDadName,
        babyName,
        setBabyName,
        isSetup,
        completeSetup,
      }}
    >
      {children}
    </PregnancyContext.Provider>
  );
}

export function usePregnancy() {
  const ctx = useContext(PregnancyContext);
  if (!ctx) throw new Error("usePregnancy must be used within PregnancyProvider");
  return ctx;
}
