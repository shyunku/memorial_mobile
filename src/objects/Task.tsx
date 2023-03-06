import uuid from 'react-native-uuid';
import Category from './Category';
import SubTask from './Subtask';

class Task {
  private _id: string;
  private _createdAt: Date | null = null;
  private _doneAt: Date | null = null;
  private _dueDate: Date | null;

  private _title: string;
  private _memo: string = '';
  private _done: boolean = false;

  private _subTasks: Map<string, SubTask> = new Map();
  private _categories: Map<string, Category> = new Map();

  private _repeatPeriod: string = '';
  private _repeatStartAt: Date | null = null;

  private _next: Task | null = null;
  private _prev: Task | null = null;

  constructor(title: string, dueDate?: Date, repeatPeriod?: string) {
    this._id = uuid.v4().toString();
    this._title = title ?? null;
    this._dueDate = dueDate ?? null;

    if (dueDate != null && repeatPeriod != null) {
      this._repeatPeriod = repeatPeriod;
      this._repeatStartAt = dueDate;
    }
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get done(): boolean {
    return this._done;
  }
  public set done(value: boolean) {
    this._done = value;
  }
  public get dueDate(): Date | null {
    return this._dueDate;
  }
  public set dueDate(value: Date | null) {
    this._dueDate = value;
  }
  public get subTasks(): Map<string, SubTask> {
    return this._subTasks;
  }
  public set subTasks(value: Map<string, SubTask>) {
    this._subTasks = value;
  }
}

export default Task;
