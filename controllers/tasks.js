const Task = require('../models/Task');

const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

//非同期処理にすることを忘れずに
const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id });

    if (!getSingleTask) {
      //バッククォートだと以下のようにかける
      //もしシングルコートもしくはダブルコートだと
      //'_id:' + req.params.id + 'は存在しません'
      //と書く
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
      //return res.status(404).json('_id:' + req.params.id + 'は存在しません');
    }

    res.status(200).json(getSingleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      //更新後のデータを表示したい場合は"new"をtrueにする(デフォルトfalseなので)。
      {
        new: true,
      }
    );

    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }

    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }

    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
