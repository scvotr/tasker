import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import "./VenchelPageAdministration.css";
import { Modal } from "../../Modal/Modal.jsx";
import { useState, useEffect } from "react";
import { VenchelForm } from "./VenchelForm/VenchelForm.jsx";
import { VenchelFormV2 } from "./VenchelFormV2/VenchelFormV2.jsx";
import { useAuthContext } from "../../../context/AuthProvider.js";
import { HOST_ADDR } from "../../../utils/ApiHostAdres.js";
import { VenchelTableView } from "./VenchelTableView/VenchelTableView.jsx";

const getAllVenchels = async (token, onSuccess) => {
  try {
    const res = await fetch(HOST_ADDR + "/venchel/getAllVenchels", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const resData = await res.json();
      onSuccess(null);
      return resData;
    } else {
      throw new Error("Server response was not ok or content type is not JSON");
    }
  } catch (error) {
    onSuccess(error)
  }
}

export const VenchelPageAdministration = () => {
  const currentUser = useAuthContext();
  const [resStaus, setReqStatus] = useState(null);

  const [venchels, setVenchels] = useState()
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const [taskFormKey, setTaskFormKey] = useState(0);

  const handleReRenderByModal = (isUpdate) => {
    setTaskFormKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    console.log('re render')
    if (currentUser.login) {
      try {
        getAllVenchels(currentUser.token, setReqStatus).then((data) => {
          setVenchels(data);
        });
      } catch (error) {}
    }
  }, [currentUser, taskFormKey]);

  return (
    <div className="admin-venchel-page">
      <div className="admin-venchel-page__container">
        Редактирование оборудования {resStaus}
      </div>
      <div className="admin-venchel-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-venchel__body">
        <button onClick={openModal}>Add</button>
        {showModal && (
          <Modal isOpen={openModal} onClose={closeModal}>
            <VenchelFormV2 keyProp={taskFormKey} reRender = {handleReRenderByModal}/>
          </Modal>
        )}
        <VenchelTableView data = {venchels} reRender = {handleReRenderByModal}/>
      </div>
    </div>
  );
};
