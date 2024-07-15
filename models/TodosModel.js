const pool = require('../config/postgresqlConfig');

/* 
  取得使用者todo
  @param request and response
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
  @param request and response
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
  @param request and response
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
  @param request and response
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
  @param request and response
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

module.exports = {
  getTodos,
  addTodo,
  toggleTodoAsCompleted,
  editTodoContent,
  removeTodo

  // Add more model methods as needed
};