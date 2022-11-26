import React from 'react';
import { useSelector } from 'react-redux';
import EditMasterModal from './special/forms/EditMasterModal';
import MasterInfoPanel from './special/MasterInfoPanel';

export default function AllMastersEntries() {
  const masters = useSelector((state) => state.adminEntities.masters);
  const [selectedMaster, setSelectedMaster] = React.useState(masters[0]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return (
    <>
      <div className="text-center text-xl py-2 border-b-[1px] border-b-gray-300">
        <h1>Изменение информации о работающих мастерах</h1>
      </div>
      <div className="w-full min-h-full text-xl flex sm:flex-row flex-col justify-center items-start">
        <div className="p-2 w-full h-full flex flex-col">
          <h1 className="text-secondary-color mb-2">Все мастера</h1>
          <div className="flex flex-col gap-2">
            {
              masters && masters.map((master) => (
                <div key={master.id} className="flex sm:flex-row flex-col edit-services-container md:w-2/3 xl:w-3/5 w-full md:text-xl text-base">
                  <MasterInfoPanel master={master} />
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="text-green-500 text-base"
                      onClick={() => {
                        setSelectedMaster(master);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="text-red-500 text-base"
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
        master={selectedMaster}
      />
    </>
  );
}

AllMastersEntries.propTypes = {};
