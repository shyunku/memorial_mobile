import {statesSlice} from '@/store/stateSlice';
import {colorize} from '@/util/common';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useTransaction = () => {
  const states = useSelector(statesSlice);
  const dispatch = useDispatch();

  const [promises, setPromises] = useState({});
  const [executing, setExecuting] = useState(false);
  const [promiseCounter, setPromiseCounter] = useState(0);

  const addPromise = useCallback((promise: Promise<any>) => {
    setPromiseCounter(pc => {
      setPromises(prev => {
        const promiseUuid = pc;
        let newPromises = {...prev, [promiseUuid]: promise};
        // console.log(`--> added promise ${promiseUuid}`);
        return newPromises;
      });
      return pc + 1;
    });
  }, []);

  const executePromises = useCallback(async () => {
    const promiseLength = Object.keys(promises).length;
    if (promiseLength === 0 || executing) return;

    setExecuting(true);
    const proms: any = {...promises};
    // pop first promise
    const poppedPromiseKey = Object.keys(proms)[0];

    if (poppedPromiseKey == null) {
      setExecuting(false);
      return;
    }

    setPromises(ps => {
      const copied: any = {...ps};
      delete copied[poppedPromiseKey];
      // console.log(`<-- deleted promise ${poppedPromiseKey}`);
      return copied;
    });

    try {
      const promise = proms[poppedPromiseKey];
      const transition = await promise(states);
      console.log(colorize.blue(`[Execute promise ${poppedPromiseKey}]`));
      // console.log("<-- transition", transition, states);
      if (transition == null) return;
      const copied = {...states};
      for (let key in transition) {
        copied[key] = {...transition[key]};
      }
      // apply copied to states
      dispatch(setAll(copied));
    } catch (err) {
      console.error(err);
    }
    setExecuting(false);
  }, [promises, executing, states]);

  // TODO :: fix infinite loop (when promises appended while executing,
  //       it will be executed again and again with old states)
  useEffect(() => {
    if (Object.keys(promises).length > 0 && !executing) {
      executePromises();
    }
  }, [promises, executing, states, executePromises]);

  return {addPromise, executing, promiseCounter};
};

export default useTransaction;

function setAll(copied: any): any {
  throw new Error('Function not implemented.');
}
