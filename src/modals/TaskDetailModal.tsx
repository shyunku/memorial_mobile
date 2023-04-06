import AppButton from '@/atoms/AppButton';
import AppText from '@/atoms/AppText';
import SubtaskListItem from '@/components/SubtaskListItem';
import DateRepeatPicker from '@/molecules/DateRepeatPicker.style';
import DateTimePicker from '@/molecules/DateTimePicker';
import SubTask from '@/objects/Subtask';
import Task from '@/objects/Task';
import {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import StandardModal, {StandardModalProps} from './StandardModal';
import TaskDetailModalStyle from './TaskDetailModal.style';

interface TaskDetailModalProps extends StandardModalProps {
  task: Task | null;
}

const TaskDetailModal = ({task, ...rest}: TaskDetailModalProps) => {
  const subtasks: SubTask[] = useMemo(() => {
    return task?.subTasks != null ? Array.from(task.subTasks.values()) : [];
  }, [task]);

  return (
    <StandardModal {...rest}>
      <View
        testID="task-detail-title"
        style={TaskDetailModalStyle.taskDetailTitle}>
        <AppText size={20} weight="bold">
          {task?.title || '-'}
        </AppText>
      </View>
      <View testID="task-options">
        <View
          testID="task-option"
          style={[
            TaskDetailModalStyle.taskOption,
            TaskDetailModalStyle.taskOption_notLast,
          ]}>
          <DateTimePicker date={task?.dueDate ?? null} />
        </View>
        {task?.dueDate != null && task?.repeatPeriod != null && (
          <View
            testID="task-option"
            style={[
              TaskDetailModalStyle.taskOption,
              TaskDetailModalStyle.taskOption_notLast,
            ]}>
            <DateRepeatPicker
              date={task?.dueDate ?? null}
              repeatPeriod={task?.repeatPeriod ?? null}
            />
          </View>
        )}
      </View>
      <ScrollView
        testID="task-subtasks"
        style={TaskDetailModalStyle.taskSubtasks}>
        {subtasks.map((subtask, index) => {
          return (
            <SubtaskListItem
              key={subtask.id}
              subtask={subtask}
              notLast={index < subtasks.length - 1}
            />
          );
        })}
      </ScrollView>
      <View testID="remain-timer" style={TaskDetailModalStyle.remainTimer}>
        <AppText
          size={10}
          weight="bold"
          style={TaskDetailModalStyle.remainTimerLabel}>
          남은 시간
        </AppText>
        <AppText
          size={16}
          weight="normal"
          style={TaskDetailModalStyle.remainTimerText}>
          18일 19시간 32분 12초
        </AppText>
      </View>
      <AppButton title={'하위 할 일 또는 이벤트 추가'} size={11} />
    </StandardModal>
  );
};

export default TaskDetailModal;
