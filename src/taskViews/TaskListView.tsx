import AppText from '@/atoms/AppText';
import TaskListItem from '@/components/TaskListItem';
import Task from '@/objects/Task';
import TaskListViewStyle from '@/taskViews/TaskListView.style';
import {useMemo} from 'react';
import {View} from 'react-native';

interface TaskListViewProps {
  taskMap: {[key: string]: Task};
}

const TaskListView = ({taskMap, ...rest}: TaskListViewProps): JSX.Element => {
  const taskList: Task[] = useMemo(() => {
    const tl: Task[] = [];
    for (let tid in taskMap) {
      tl.push(taskMap[tid]);
    }
    return tl;
  }, [taskMap]);

  const [doneTaskList, notDoneTaskList] = useMemo(() => {
    const doneTaskList: Task[] = [];
    const notDoneTaskList: Task[] = [];

    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i];
      (task.done ? doneTaskList : notDoneTaskList).push(task);
    }

    return [doneTaskList, notDoneTaskList];
  }, [taskList]);

  return (
    <View testID="task-list-view" style={TaskListViewStyle.taskListView}>
      <View testID="task-groups" style={TaskListViewStyle.taskGroups}>
        <TaskGroup label="해야할 일" taskList={notDoneTaskList} {...rest} />
        <TaskGroup label="완료됨" taskList={doneTaskList} {...rest} />
      </View>
    </View>
  );
};

interface TaskGroupProps {
  label: string;
  taskList: Task[];
}

const TaskGroup = ({label, taskList, ...rest}: TaskGroupProps): JSX.Element => {
  return (
    <View testID="task-group" style={TaskListViewStyle.taskGroup_notLast}>
      <View
        testID="task-group-header"
        style={TaskListViewStyle.taskGroupHeader}>
        <AppText size={13} weight="bold" color="#545a60">
          {label}
        </AppText>
      </View>
      <View testID="task-list" style={TaskListViewStyle.taskList}>
        {taskList.map((task, index) => {
          return (
            <TaskListItem
              key={index}
              task={task}
              notLast={index < 23 - 1}
              {...rest}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TaskListView;
