import uuid from 'react-native-uuid';

class Category {
  private id?: string;
  private title?: string;
  private secret?: boolean;
  private encryptedPassword?: string;
  private color?: string;
  private isDefault?: boolean;

  constructor(title: string, secret: boolean, isDefault: boolean) {
    this.id = uuid.v4().toString();
    this.title = title;
    this.secret = secret;
    this.isDefault = isDefault;
  }
}

export default Category;
