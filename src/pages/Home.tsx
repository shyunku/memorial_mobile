import AppText from '@/atoms/AppText';
import {applyInitialState} from '@/hooks/executor';
import useSocket from '@/hooks/websocket';
import TaskDetailModal from '@/modals/TaskDetailModal';
import SubTask from '@/objects/Subtask';
import Task from '@/objects/Task';
import TaskListView from '@/taskViews/TaskListView';
import moment from 'moment';
import React, {useMemo} from 'react';
import {useEffect} from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import Modal from 'react-native-modal';
import HomeStyle from './Home.style';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSlice} from '@/store/stateSlice';

const TaskViewMode = {
  LIST: '리스트',
  CALENDAR: '캘린더',
};

const SortOption = {
  IMPORTANT: '중요도',
  DUE_DATE: '기한',
  REMAIN_DATE: '남은 기한',
  CREATED_DATE: '생성일',
};

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const taskMap: any = useSelector(tasksSlice);

  // console.log('taskMap', taskMap);
  const [selectedTaskItemId, setSelectedTaskItemId] = React.useState<
    string | null
  >(null);
  const currentTaskViewMode = TaskViewMode.LIST;
  const currentSortOption = SortOption.IMPORTANT;
  const [showTaskDetailModal, setShowTaskDetailModal] = React.useState(false);
  const [localBlockNumber, setLocalBlockNumber] = React.useState(0);
  const [remoteBlockNumber, setRemoteBlockNumber] = React.useState(0);

  const selectedTask: Task | null = useMemo(() => {
    return taskMap[selectedTaskItemId || ''] ?? null;
  }, [selectedTaskItemId, taskMap]);

  const {socket, connected: socketConnected, onMessage, sendSync} = useSocket();

  useEffect(() => {
    if (!socketConnected) return;
    (async () => {
      const lastRemoteBlockNumber: any = await sendSync('lastBlockNumber');
      setRemoteBlockNumber(lastRemoteBlockNumber);
      const lastState: any = await sendSync('stateByBlockNumber', {
        blockNumber: lastRemoteBlockNumber,
      });
      // console.log(lastState);
      try {
        applyInitialState(dispatch, lastRemoteBlockNumber, lastState);
      } catch (err) {
        console.error(err);
      }
    })();

    onMessage('broadcast_transaction', (data: any) => {
      console.log('tx', data);
    });
  }, [socketConnected]);

  const taskSelectHandler = (taskId: string) => {
    setSelectedTaskItemId(taskId);
    setShowTaskDetailModal(true);
  };

  const taskUnselectHandler = () => {
    setSelectedTaskItemId(null);
    setShowTaskDetailModal(false);
  };

  return (
    <View style={HomeStyle.homeContainer}>
      <ScrollView stickyHeaderIndices={[0]} style={{width: '100%'}}>
        <View testID="header" style={HomeStyle.header}>
          <View testID="sync-section" style={HomeStyle.syncSection}>
            <AppText size={10} weight={500}>
              {socketConnected ? '서버 연결됨' : '연결 안됨'}
            </AppText>
            <AppText size={10} weight={500}>
              동기화 중
            </AppText>
            <AppText size={10} weight={500}>
              {localBlockNumber}/{remoteBlockNumber}
            </AppText>
          </View>
          <View testID="title-section" style={HomeStyle.titleSection}>
            <AppText weight={500} size={25}>
              모든 할일 ({taskMap.size})
            </AppText>
          </View>
          <View testID="option-section" style={HomeStyle.optionSection}>
            <View testID="view-options" style={HomeStyle.viewOptions}>
              {Object.values(TaskViewMode).map((mode, index) => {
                const styles: any[] = [HomeStyle.viewOption];
                const selected = mode === currentTaskViewMode;

                if (index < Object.values(TaskViewMode).length - 1) {
                  styles.push(HomeStyle.viewOption_notLast);
                }
                if (selected) {
                  styles.push(HomeStyle.viewOption_selected);
                }
                return (
                  <View testID="view-option" key={mode} style={styles}>
                    <AppText
                      style={[
                        HomeStyle.viewOptionText,
                        selected ? HomeStyle.viewOptionText_selected : {},
                      ]}
                      size={10}>
                      {mode}
                    </AppText>
                  </View>
                );
              })}
            </View>
            <View testID="extra-options" style={HomeStyle.viewOptions}>
              {Object.values(SortOption).map((option, index) => {
                const styles: any[] = [HomeStyle.viewOption];
                const selected = option === currentSortOption;

                if (index < Object.values(SortOption).length - 1) {
                  styles.push(HomeStyle.viewOption_notLast);
                }
                if (selected) {
                  styles.push(HomeStyle.viewOption_selected);
                }

                return (
                  <View testID="view-option" key={option} style={styles}>
                    <AppText
                      style={[
                        HomeStyle.viewOptionText,
                        selected ? HomeStyle.viewOptionText_selected : {},
                      ]}
                      size={10}>
                      {option} 순
                    </AppText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View testID="body" style={HomeStyle.body}>
          <TaskListView taskMap={taskMap} onTaskSelect={taskSelectHandler} />
        </View>
      </ScrollView>
      <TaskDetailModal
        task={selectedTask}
        visible={showTaskDetailModal && selectedTask !== null}
        onBackdropPress={taskUnselectHandler}
      />
    </View>
  );
};

export default Home;
