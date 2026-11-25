import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ChooseClientCard from "./ChooseClientCard";
import VisitHistoryList from "./MeetingHistoryList";
import ClientPickerModal from "./ClientPickerModal";
import CheckoutModal from "./CheckoutModal";

export default function MeetingList({ client, setClient, visits, setVisits }: any) {
  const [clientModal, setClientModal] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [desc, setDesc] = useState("");
  const [editingVisitId, setEditingVisitId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  /** Single active visit in progress: { id, client, checkIn } or null */
  const [activeVisit, setActiveVisit] = useState<{
    id: string;
    client: any;
    checkIn: number;
  } | null>(null);

  /** When parent sets client (e.g. from Schedule → Start Visit), show it and allow check-in */
  useEffect(() => {
    if (client) {
      setSelectedClient(client);
    }
  }, [client]);

  const formatTime = (t?: number) =>
    t ? new Date(t).toLocaleTimeString() : "";

  const formatDate = () => new Date().toLocaleDateString();

  const duration = (start?: number, end?: number) => {
    if (!start || !end) return "";
    const s = Math.floor((end - start) / 1000);
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  const handleSelectClient = (selected: any) => {
    if (editingVisitId && activeVisit?.id === editingVisitId) {
      setActiveVisit((prev) =>
        prev ? { ...prev, client: selected } : null,
      );
    }
    setClient(selected);
    setSelectedClient(selected);
    setClientModal(false);
    setEditingVisitId(null);
  };

  const handleCheckIn = () => {
    if (!selectedClient) return;
    const id = Date.now().toString();
    const newVisit = {
      id,
      client: selectedClient,
      checkIn: Date.now(),
    };
    setActiveVisit(newVisit);
  };

  const openCheckout = () => {
    if (!activeVisit) return;
    setCheckoutModal(true);
  };

  const handleSaveVisit = () => {
    if (!desc.trim() || !activeVisit) return;

    const checkout = Date.now();

    setVisits((v: any) => [
      {
        id: activeVisit.id,
        name: activeVisit.client.name,
        type: activeVisit.client.type,
        date: formatDate(),
        checkIn: activeVisit.checkIn,
        checkOut: checkout,
        remark: desc,
        duration: duration(activeVisit.checkIn, checkout),
      },
      ...v,
    ]);

    setActiveVisit(null);
    setSelectedClient(null);
    setClient(null);
    setDesc("");
    setCheckoutModal(false);
  };

  const displayClient = activeVisit?.client ?? selectedClient;
  const checkInTime = activeVisit?.checkIn ?? null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.activeContainer}>
        <ChooseClientCard
          client={displayClient}
          checkInTime={checkInTime}
          onChooseClient={() => setClientModal(true)}
          onCheckIn={handleCheckIn}
          onCheckOut={openCheckout}
        />
      </View>

      <VisitHistoryList visits={visits} formatTime={formatTime} />

      <ClientPickerModal
        visible={clientModal}
        onDismiss={() => {
          setClientModal(false);
          setEditingVisitId(null);
        }}
        onSelect={handleSelectClient}
      />

      <CheckoutModal
        visible={checkoutModal}
        onDismiss={() => setCheckoutModal(false)}
        desc={desc}
        setDesc={setDesc}
        onSave={handleSaveVisit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activeContainer: { height: "auto" },
});
