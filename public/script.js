const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    //const tasks = await axios.get('/api/v1/tasks');
    //data属性だけ欲しい
    const { data: tasks } = await axios.get('/api/v1/tasks');
    //console.log(tasks);

    //タスクが一つもない時
    //console.log(tasks.length);
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません。</h5>`;
      return;
    }

    //タスクを出力
    const allTasks = tasks
      .map((task) => {
        //console.log(task);
        //分割代入
        const { completed, _id, name } = task;
        //console.log(name);
        //以下でも同じ意味。最近は上の取り出し方が流行り
        //console.log(task.name);

        return `<div class="single-task ${completed && 'task-completed'}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <!--編集リンク-->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <!--ゴミ箱リンク-->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join(''); //map関数で配列から一個一個取り出した際に要素と要素の間に「,」が入るので、それをなくすためのjoin
    //console.log(allTasks);
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

//タスクを新規作成する
formDOM.addEventListener('submit', async (event) => {
  //submitボタンを押した際にページのリロードを行うのを防ぐ命令
  event.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post('/api/v1/tasks', { name: name });
    //console.log(name);
    showTasks();
    //再表示後にテキストボックスに前の入力内容が残っているので、以下で初期化
    taskInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'タスクを追加しました。';
    formAlertDOM.classList.add('text-success');
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = '無効です。もう一度やり直してください。';
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});

//タスクを削除する
tasksDOM.addEventListener('click', async (event) => {
  const element = event.target;
  //console.log(element);
  //console.log(element.parentElement);
  if (element.parentElement.classList.contains('delete-btn')) {
    //このプロパティは、要素上に設定された全てのカスタムdata属性(data-*)の、 読み取りと書き込みの両方のモードでのアクセスを許可します。
    //これは、各カスタムdata属性にアクセスするための入口となるDOMStringのMapになります。
    //DOMStringMapは、要素の各data-*属性をキーに持ちます。キー名は、属性名からdata-を取り除き、
    //さらに、それ以降にハイフン(-)が含まれる場合は、ハイフンを削除し、直後の1文字を大文字に変換したものになります。
    //例：属性名data-syncerならキー名はsyncer、属性名data-meta-categoryならキー名はmetaCategoryとなる。
    //つまり上でparentElementの中でdata-idを取得する場合は、dataset.idで取得するということ
    const id = element.parentElement.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
