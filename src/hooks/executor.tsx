import Task from '@/objects/Task';
import {useDispatch} from 'react-redux';
import {setCategories, setTasks} from '@/store/stateSlice';
import Category from '@/objects/Category';

export const applyInitialState = (
  dispatch: Function,
  blockNumber: number,
  data: any,
) => {
  const {categories, tasks} = data;
  const taskMap: {[key: string]: any} = {};
  const categoryMap: {[key: string]: any} = {};

  for (let cid in categories) {
    const rawCategory = categories[cid];
    const category = new Category(rawCategory.title, rawCategory.secret, false);
    category.id = cid;
    category.createdAt = new Date(rawCategory.createdAt);
    categoryMap[cid] = category;
  }

  for (let tid in tasks) {
    const rawTask = tasks[tid];
    const task = new Task(rawTask.title);
    task.id = tid;
    task.repeatStartAt = new Date(rawTask.repeatStartAt);
    task.repeatPeriod = rawTask.repeatPeriod;
    task.memo = rawTask.memo;
    task.dueDate = new Date(rawTask.dueDate);
    task.done = rawTask.done;
    task.doneAt = new Date(rawTask.doneAt);
    task.createdAt = new Date(rawTask.createdAt);

    const rawTaskCategories = rawTask.categories;
    console.log('rtc', rawTaskCategories);

    const rawSubtasks = rawTask.subtasks;
    console.log('st', rawSubtasks);

    taskMap[tid] = task;
  }

  dispatch(setCategories(categoryMap));
  dispatch(setTasks(taskMap));
};
