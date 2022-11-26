type DefaultCollectionItem = {id: string};

export type Collection<I extends DefaultCollectionItem> = {
  byId: {
    [id in I['id']]: I;
  };
  allIds: Array<I['id']>;
};

export const updateItemInCollection = <I extends DefaultCollectionItem>(
  newItemValues: Partial<I> & DefaultCollectionItem,
  collection: Collection<I>,
) => {
  return {
    ...collection,
    byId: {
      ...collection.byId,
      [newItemValues.id]: {
        ...collection.byId[newItemValues.id],
        ...newItemValues,
      },
    },
  };
};

export const addItemInCollection = <I extends DefaultCollectionItem>(
  newItem: I,
  collection: Collection<I>,
) => {
  return {
    byId: {
      ...collection.byId,
      [newItem.id]: newItem,
    },
    allIds: [...collection.allIds, newItem.id],
  };
};

export const mapCollection = <I extends DefaultCollectionItem>(
  fn: (item: I, index: number) => unknown,
  collection: Collection<I>,
) => {
  return collection.allIds.map((itemId, index) => {
    const item = collection.byId[itemId];
    return fn(item, index);
  });
};
