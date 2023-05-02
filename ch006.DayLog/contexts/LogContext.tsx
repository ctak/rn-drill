import React, {useEffect, useRef} from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const initialLogsRef = useRef(null); // 이게 왜 필요하지? => 저장 시점을 알기 위하여 필요. useEffect 내에서 if (logs === initialLogsRef.current) { return; }
  const [logs, setLogs] = useState(
    [],
    // Array.from({length: 10})
    //   .map((_, index) => ({
    //     id: uuidv4(),
    //     title: `Log ${index}`,
    //     body: `Log ${index}`,
    //     date: new Date().toISOString(),
    //   }))
    //   .reverse(),
  );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = modified => {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  const onRemove = id => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // 왜냐, useEffect 는 async 를 쓸 수 없기 때문에?
    // 아니지. 이렇게 밖에는 쓸 수 없겠네.
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}
export default LogContext;
