import { useState } from "react";
import { View } from "react-native";
import { SegmentedButtons, Snackbar, useTheme } from "react-native-paper";
import ScheduledVisitList from "../../components/meetings/ScheduledVisitList";
import MeetingList from "../../components/meetings/MeetingList";

export default function VisitScreen() {
  const theme = useTheme();
  const [segment, setSegment] = useState("visit");

const [client , setClient] = useState<any>(null);

  const [visits, setVisits] = useState<any[]>([]);
  
  const [snack, setSnack] = useState(false);

  /* ⭐ IMPORTANT → client must have id */
  const scheduledVisits = [
    {
      id: "1",
      client: { id: "c1", name: "ABC Pharma", type: "Doctor" },
      date: "22 Feb",
      time: "11:00 AM",
      location: "Patna",
    },
    {
      id: "2",
      client: { id: "c2", name: "City Hospital", type: "Hospital" },
      date: "23 Feb",
      time: "2:30 PM",
      location: "Danapur",
    },
  ];

  /* ⭐ FINAL scheduled start logic */
  const startScheduledVisit = (item: any) => {
    setClient(item.client);

    setSegment("visit");
    setSnack(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SegmentedButtons
        value={segment}
        onValueChange={setSegment}
        buttons={[
          { value: "visit", label: "Visit" },
          { value: "schedule", label: "Schedule" },
        ]}
        style={{ margin: 16 }}
      />

      {segment === "visit" ? (
       
       <MeetingList
          client={client}
          setClient={setClient}
          visits={visits}
          setVisits={setVisits}
        />

      ) : (
        <ScheduledVisitList
          data={scheduledVisits}
          onStart={startScheduledVisit}
        />
      )}

      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        duration={2000}
      >
        Client selected for visit
      </Snackbar>
    </View>
  );
}
