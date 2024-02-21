const itemsDBScent = async function (items, model) {
  const itemsDB = items.map(async (item) => {
    try {
      const itemDB = await model.findById(item.id);

      const selectedQuantity = itemDB.quantities.find((q) => {
        return q.quantity === item.quantity;
      });

      if (!itemDB) {
        return {
          notFound: true,
          itemId: item.id,
          quantity: item.quantity,
        };
      }

      if (!selectedQuantity.stock) {
        return {
          noStock: true,
          itemId: item.id,
          quantity: item.quantity,
        };
      }

      return itemDB;
    } catch (err) {
      return {
        error: true,
        itemId: item.id,
        quantity: item.quantity,
      };
    }
  });

  const awaitedCartItemsDB = await Promise.all(itemsDB);

  return awaitedCartItemsDB;
};

module.exports = itemsDBScent;
