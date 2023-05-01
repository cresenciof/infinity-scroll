import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Box from "@/components/Box";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/styles/Global.module.css";

const IndexPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const {
    isIntersecting,
    stopObservingCurrentElement,
    startObserving,
    stopObserving,
  } = useIntersectionObserver();

  const fetchMore = useCallback(
    () =>
      setItems((prev) => {
        stopObservingCurrentElement();
        startObserving(ref.current!);
        if (prev.length === 30) {
          stopObserving();
          return prev;
        }
        return [...prev, prev.length + 1];
      }),
    [stopObservingCurrentElement, startObserving, stopObserving]
  );

  useEffect(() => {
    if (isIntersecting) {
      fetchMore();
    }
  }, [isIntersecting]);

  useEffect(() => {
    startObserving(ref.current!);
  }, []);

  return (
    <main className={styles.container}>
      <div className={`${styles.sticky} ${styles.header}`}>
        <h1>Scroll me -</h1>
        <h1>Items : {items.length}</h1>
      </div>
      <section id="dynamicBoxes">
        {items.map((item, index) => (
          <div key={item} ref={index === items.length - 1 ? ref : null}>
            <Box />
            {item}
            <hr />
          </div>
        ))}
      </section>
    </main>
  );
};

export default IndexPage;
