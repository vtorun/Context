import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // ürünü sepete ekle / miktarını arttır
  const addToBasket = (product) => {
    const found = basket.find((i) => i.id === product.id);

    if (!found) {
      setBasket(basket.concat({ ...product, amount: 1 }));

      toast.success("Ürün sepete eklendi");
    } else {
      const updated = { ...found, amount: found.amount + 1 };
      const newBasket = basket.map((i) => (updated.id === i.id ? updated : i));
      setBasket(newBasket);

      toast.info(`Ürünün miktarı arttırıldı (${updated.amount})`);
    }
  };

  // ürünü state'den kaldır
  const removeFromBasket = (delete_id) => {
    const filtred = basket.filter((item) => item.id !== delete_id);

    setBasket(filtred);

    toast.error("Ürün sepetten silindi");
  };

  // ürünün miktarını azalt
  const decreaseAmount = (delete_id) => {
    // id'si bilinen elemanı dizide bul
    const found = basket.find((item) => item.id === delete_id);
    if (found.amount > 1) {
      const updated = { ...found, amount: found.amount - 1 };
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      setBasket(newBasket);

      toast.info(`Ürünün miktarı azaltıldı ${updated.amount}`);
    } else {
      removeFromBasket(delete_id);
    }
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
