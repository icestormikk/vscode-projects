/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import AddNewServiceForm from './special/forms/AddNewServiceForm';
import AddNewSubserviceForm from './special/forms/AddNewSubserviceForm';
import DeleteEntityModal from './special/forms/DeleteEntityModal';
import EditServiceModal from './special/forms/EditServiceModal';
import EditSubserviceModal from './special/forms/EditSubserviceModal';

export default function AllServiceEntries() {
  const services = useSelector((state) => state.adminEntities.services);
  const subservices = useSelector((state) => state.adminEntities.subservices);

  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = React.useState(false);
  const [isEditSubserviceModalOpen, setIsEditSubserviceModalOpen] = React.useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = React.useState(false);
  const [isAddSubserviceModalOpen, setIsAddSubserviceModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState({
    object: services[0],
    sectionTitle: 'services',
  });
  const [selectedServiceSection, setSelectedServiceSection] = React.useState(0);

  return (
    <>
      <div className="text-center text-xl py-2">
        <h1>Изменение параметров услуг и их разделов</h1>
      </div>
      <div className="w-full min-h-full text-xl flex sm:flex-row flex-col justify-center items-start border-t-[1px] border-t-gray-300">
        <div className="p-2 w-full h-full flex flex-col border-r-[1px] border-r-gray-300">
          <h1 className="text-secondary-color mb-2">Все разделы услуг</h1>
          <div className="ml-10 flex flex-col gap-2">
            <button
              type="button"
              className="w-max px-4 bg-green-500 text-white rounded-sm text-base"
              onClick={() => {
                setIsAddServiceModalOpen(true);
              }}
            >
              + Добавить
            </button>
            {
              services && services.map((service) => (
                <div key={service.id} className="edit-services-container">
                  <p>{service.title}</p>
                  <div className="edit-services-buttons">
                    <button
                      type="button"
                      className="text-green-500 text-base"
                      onClick={() => {
                        setSelectedEntity({
                          object: service,
                          sectionTitle: 'services',
                        });
                        setIsEditServiceModalOpen(true);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="text-red-500 text-base"
                      onClick={() => {
                        setSelectedEntity({
                          object: service,
                          sectionTitle: 'services',
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
        <div className="p-2 w-full flex flex-col">
          <h1 className="text-secondary-color mb-2">Все услуги</h1>
          {
            services && services.map((service) => (
              <div key={service.id}>
                <h1 className="text-gray-500">{service.title}</h1>
                <button
                  type="button"
                  className="w-max px-4 bg-green-500 text-white rounded-sm text-base"
                  onClick={() => {
                    setIsAddSubserviceModalOpen(true);
                    setSelectedServiceSection(service.id);
                  }}
                >
                  + Добавить
                </button>
                <div className="ml-10 w-5/6 flex flex-col">
                  {
                    subservices.filter(
                      (subservice) => subservice.serviceID === service.id,
                    ).map((subservice) => (
                      <div key={subservice.id} className="edit-services-container">
                        <p>{subservice.title}</p>
                        <div className="edit-services-buttons">
                          <button
                            type="button"
                            className="text-green-500 text-base"
                            onClick={() => {
                              setSelectedEntity({
                                object: subservice,
                                sectionTitle: 'subservices',
                              });
                              setIsEditSubserviceModalOpen(true);
                            }}
                          >
                            Изменить
                          </button>
                          <button
                            type="button"
                            className="text-red-500 text-base"
                            onClick={() => {
                              setSelectedEntity({
                                object: subservice,
                                sectionTitle: 'subservices',
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
            ))
          }
        </div>
        <EditServiceModal
          isModalOpen={isEditServiceModalOpen}
          setModalOpen={setIsEditServiceModalOpen}
          service={selectedEntity.object}
        />
        <EditSubserviceModal
          isModalOpen={isEditSubserviceModalOpen}
          setModalOpen={setIsEditSubserviceModalOpen}
          subservice={selectedEntity.object}
        />
        <DeleteEntityModal
          isModalOpen={isDeleteModalOpen}
          setModalOpen={setIsDeleteModalOpen}
          entity={selectedEntity.object}
          modalTitle={`Удаление "${selectedEntity.object.title}"`}
          entityTitle={selectedEntity.object.title}
          entitySectionTitle={selectedEntity.sectionTitle}
        />
        <AddNewServiceForm
          isModalOpen={isAddServiceModalOpen}
          setModalOpen={setIsAddServiceModalOpen}
        />
        <AddNewSubserviceForm
          isModalOpen={isAddSubserviceModalOpen}
          setModalOpen={setIsAddSubserviceModalOpen}
          selectedServiceID={selectedServiceSection}
        />
      </div>
    </>
  );
}
