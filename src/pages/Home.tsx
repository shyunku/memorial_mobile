import AppText from '@/atoms/AppText';
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
  const [selectedTaskItemId, setSelectedTaskItemId] = React.useState<
    string | null
  >(null);
  const currentTaskViewMode = TaskViewMode.LIST;
  const currentSortOption = SortOption.IMPORTANT;
  const [showTaskDetailModal, setShowTaskDetailModal] = React.useState(false);

  const [taskMap, setTaskMap] = React.useState<Map<string, Task>>(new Map());

  const selectedTask: Task | null = useMemo(() => {
    return taskMap.get(selectedTaskItemId || '') ?? null;
  }, [selectedTaskItemId, taskMap]);

  useEffect(() => {
    setTaskMap(tm => {
      const newTaskMap = new Map(tm);
      for (let i = 0; i < 10; i++) {
        const task = new Task(`할 일 ${i + 1}`);
        if (Math.random() < 0.5) {
          task.dueDate = moment()
            .add(Math.random() * 1000000, 'second')
            .toDate();
        }
        if (Math.random() < 1) {
          for (let j = 0; j < Math.random() * 10; j++) {
            const subtask = new SubTask(`서브 할 일 ${j + 1}`);
            task.subTasks.set(subtask.id, subtask);
          }
        }
        if (Math.random() < 0.3) {
          task.done = true;
        }
        newTaskMap.set(task.id, task);
      }
      return newTaskMap;
    });

    return () => {
      setTaskMap(new Map());
    };
  }, []);

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
