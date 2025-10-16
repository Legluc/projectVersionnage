import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {}
  }
  Task.init(
    {
      done: DataTypes.BOOLEAN,
      datetime: DataTypes.DATE,
      titre: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Task',
    },
  )
  return Task
}
