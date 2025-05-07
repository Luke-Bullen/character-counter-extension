import { Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import SavedListItem from './SavedListItem';
import { EntityObjectType } from '../shared';
import { store } from '../../redux';

const SavedList: FC = () => {
  const tempOrderArray = ['1', '2', '3'];

  const [orderArray, setOrderArray] = useState<string[]>([]);
  const [allSavedEntriesObject, setAllSavedEntriesObject] = useState<
    Record<string, EntityObjectType>
  >({});

  const getAllSavedEntries = async () => {
    const { listOrder, savedEntries } = store.getState().list;

    setOrderArray(listOrder);
    setAllSavedEntriesObject(savedEntries);
  };

  useEffect(() => {
    getAllSavedEntries();
  }, []);
  store.subscribe(getAllSavedEntries);

  console.log(orderArray);
  console.log(allSavedEntriesObject);

  return (
    <>
      {orderArray.length ? (
        <Stack direction='column'>
          {tempOrderArray.map((id) => {
            return <SavedListItem key={id} id={id} />;
          })}
        </Stack>
      ) : (
        <p>There are no saved entries</p>
      )}
    </>
  );
};

export default SavedList;
