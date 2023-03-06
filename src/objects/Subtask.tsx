import uuid from 'react-native-uuid';

class SubTask {
  private _id: string;
  private _createdAt: Date | null = null;
  private _doneAt: Date | null = null;
  private _dueDate: Date | null;

  private _title: string | null;
  private _done: boolean = false;

  constructor(title: string, dueDate?: Date) {
    this._id = uuid.v4().toString();
    this._title = title;
    this._dueDate = dueDate ?? null;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get title(): string | null {
    return this._title;
  }
  public set title(value: string | null) {
    this._title = value;
  }
}

export default SubTask;
