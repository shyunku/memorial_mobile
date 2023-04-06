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

  private _repeatPeriod: string | null = null;
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
  public set repeatPeriod(value: string | null) {
    this._repeatPeriod = value;
  }
  public get repeatPeriod(): string | null {
    return this._repeatPeriod;
  }
  public set repeatStartAt(value: Date | null) {
    this._repeatStartAt = value;
  }
  public get repeatStartAt(): Date | null {
    return this._repeatStartAt;
  }
  public get createdAt(): Date | null {
    return this._createdAt;
  }
  public set createdAt(value: Date | null) {
    this._createdAt = value;
  }
  public get memo(): string {
    return this._memo;
  }
  public set memo(value: string) {
    this._memo = value;
  }
  public get doneAt(): Date | null {
    return this._doneAt;
  }
  public set doneAt(value: Date | null) {
    this._doneAt = value;
  }
}

export default Task;
