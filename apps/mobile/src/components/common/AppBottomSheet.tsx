import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import { spacing, radius } from "../../theme/constants";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  /** Snap points — defaults to ["50%"]. Pass ["75%"] for tall content, ["40%"] for compact forms. */
  snapPoints?: string[];
};

/**
 * App-wide bottom sheet wrapper built on @gorhom/bottom-sheet.
 * Mirrors the BaseModal API (visible + onDismiss) so it's a drop-in replacement.
 *
 * Uses BottomSheetView (not BottomSheetScrollView) so consumers can embed
 * FlashList / FlatList without triggering nested-VirtualizedList warnings.
 *
 * @example
 * <AppBottomSheet visible={open} onDismiss={() => setOpen(false)} snapPoints={["55%"]}>
 *   <Text>Content here</Text>
 * </AppBottomSheet>
 */
export function AppBottomSheet({
  visible,
  onDismiss,
  children,
  snapPoints: snapPointsProp,
}: Props) {
  const theme = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(
    () => snapPointsProp ?? ["50%"],
    [snapPointsProp]
  );

  useEffect(() => {
    if (visible) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={[styles.handle, { backgroundColor: theme.colors.outline }]}
      backgroundStyle={[styles.background, { backgroundColor: theme.colors.surface }]}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetView style={styles.content}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.full,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl + 16,
    paddingTop: spacing.md,
  },
});
