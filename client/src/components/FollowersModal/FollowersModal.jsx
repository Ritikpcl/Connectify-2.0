import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard";
import './FollowersModal.css'

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  return (
    <div className="modal-div">
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      
      overlayOpacity={0.55}
      overlayBlur={2}
      size="100%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}

    >
  
    <FollowersCard location='modal'/>
    </Modal>
    </div>
    
  );
};

export default FollowersModal;
