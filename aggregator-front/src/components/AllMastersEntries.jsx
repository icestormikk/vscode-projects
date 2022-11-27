/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import AddNewMasterForm from './special/forms/AddNewMasterForm';
import DeleteEntityModal from './special/forms/DeleteEntityModal';
import EditMasterModal from './special/forms/EditMasterModal';
import MasterInfoPanel from './special/MasterInfoPanel';

export default function AllMastersEntries() {
  const masters = useSelector((state) => state.adminEntities.masters);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedMaster, setSelectedMaster] = React.useState({
    object: masters[0],
    sectionTitle: 'masters',
  });

  return (
    <>
      <div className="text-center text-xl py-2 border-b-[1px] border-b-gray-300">
        <h1>Изменение информации о работающих мастерах</h1>
      </div>
      <div className="w-full min-h-full text-xl flex sm:flex-row flex-col justify-center items-start">
        <div className="p-2 w-full h-full flex flex-col">
          <h1 className="text-secondary-color mb-2">Все мастера</h1>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="w-max px-4 bg-green-500 text-white rounded-sm text-base"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              + Добавить
            </button>
            {
              masters && masters.map((master) => (
                <div key={master.id} className="flex sm:flex-row gap-6 flex-col edit-services-container md:w-max w-full md:text-xl text-base">
                  <MasterInfoPanel master={master} />
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="text-green-500 text-base"
                      onClick={() => {
                        setSelectedMaster({
                          object: master,
                          sectionTitle: 'masters',
                        });
                        setIsEditModalOpen(true);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="text-red-500 text-base"
                      onClick={() => {
                        setSelectedMaster({
                          object: master,
                          sectionTitle: 'masters',
                        });
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <EditMasterModal
        isModalOpen={isEditModalOpen}
        setModalOpen={setIsEditModalOpen}
        master={selectedMaster.object}
      />
      <DeleteEntityModal
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}
        entity={selectedMaster.object}
        modalTitle={`Удаление мастера ${selectedMaster.object.name} ${selectedMaster.object.surname}`}
        entityTitle={`${selectedMaster.object.name} ${selectedMaster.object.surname}`}
        entitySectionTitle={selectedMaster.sectionTitle}
      />
      <AddNewMasterForm
        isModalOpen={isAddModalOpen}
        setModalOpen={setIsAddModalOpen}
      />
    </>
  );
}

AllMastersEntries.propTypes = {};
