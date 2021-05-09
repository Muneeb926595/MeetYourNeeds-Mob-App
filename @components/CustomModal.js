import React, { useRef, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

const CustomModal = ({
  children,
  isVisible,
  onClose,
  height,
  paddingHorizontal,
}) => {
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (isVisible && bottomSheetRef) {
      bottomSheetRef.current.open();
    } else {
      bottomSheetRef.current.close();
    }
  }, [isVisible, bottomSheetRef]);

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={height || 300}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={onClose}
      customStyles={{
        container: {
          paddingHorizontal: paddingHorizontal || 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        draggableIcon: {
          backgroundColor: "#E0E0E0",
          width: 60,
          height: 5,
        },
      }}
    >
      {children}
    </RBSheet>
  );
};

export default CustomModal;
