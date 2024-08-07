const pool = require('../config/postgresqlConfig');

/* 
  使用者註冊
  @param {Object} {id} - userid
*/
async function getTodos({ id }) {
  const connection = await pool.connect();
  try {
    console.log(connection);
    const result = await connection.query('SELECT * FROM todos WHERE userid = $1', [id]);
    return result.rows;
  } finally {
    connection.release();
  }
}

/* 
  新增todo
  @param {Object} { content, completed_at, id } - todo的content, todo的completed_at, userid
*/
async function addTodo({ content, completed_at, id }) {
  const connection = await pool.connect();
  try {
    const result = await connection.query('INSERT INTO todos (content, completed_at, userid) VALUES ($1, $2, $3) RETURNING *',
    [content, completed_at, id]);
    
    return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  toggle todo 完成狀態(完成紀錄時間 未完成為null)
  @param {Object} { todoId, id } - todo的id, userid
*/
async function toggleTodoAsCompleted({ todoId, id }) {
  const connection = await pool.connect();
  try {
      const result = await connection.query(
        `UPDATE todos 
        SET completed_at = CASE 
            WHEN completed_at IS NULL THEN NOW() 
            ELSE NULL 
        END 
        WHERE id = $1 AND userid = $2
        RETURNING *`,
        [todoId, id]
      );
      return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  修改todo content
  @param {Object} { todoId, content, id } - todo的id, todo的content, userid
*/
async function editTodoContent({ todoId, content, id }) {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      'UPDATE todos SET content = $1 WHERE id = $2 AND userid = $3 RETURNING *',
      [content, todoId, id]
    );
    return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  移除todo
  @param {Object} { todoId, id } - todo的id, userid
*/
async function removeTodo({ todoId, id }) {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      'DELETE FROM todos WHERE id = $1 AND userid = $2 RETURNING *',
      [todoId, id]
    );
    return result.rows[0];
  } finally {
    connection.release();
  }
}

/* 
  todo id是否存在
  @param {String} id - todo id
*/
async function findTodosByID( id ) {
  const connection = await pool.connect();
  try {
    const result = await connection.query('SELECT * FROM todos WHERE id = $1', [id]);
    // console.log('result', result);
    return result.rows[0];
  } finally {
    connection.release();
  }
}

module.exports = {
  getTodos,
  addTodo,
  toggleTodoAsCompleted,
  editTodoContent,
  removeTodo,
  findTodosByID
};