export const removeItemFromPack = (packItems, itemToRemove, setPackItems) => {
  const existingItem = packItems.find(
    (item) => item.id === itemToRemove.id
  );
  if (existingItem) {
    return (
      setPackItems(packItems.filter((item) => item.id !== itemToRemove.id)),
      console.log("Successfully removed")
    );
  }
};

export const addItemToPack = (packItems, itemToAdd, setPackItems) => {
      setPackItems([...packItems, {...itemToAdd}]),
      console.log("Item added to pack")
};

export const clearPack = (setPackItems) => {
  return (
    setPackItems([]),
    console.log("Cart cleared")
  );
};
