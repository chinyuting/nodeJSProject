const pool = require('../config/postgresqlConfig');

async function addTodo(req, res) {
  const { content, completed_at, userid } = req.body; 
  const connection = await pool.connect();
  try {
    console.log(connection);
    const result = await connection.query('INSERT INTO todos (content, completed_at, userid) VALUES ($1, $2, $3) RETURNING *',
    [content, completed_at, userid]);
    
    return result.rows[0];
  } finally {
    connection.release();
  }
}
async function getTodos(userid) {
  const connection = await pool.connect();
  try {
    console.log(connection);
    const result = await connection.query('SELECT * FROM todos WHERE userid = $1', [userid]);
    
    return result.rows;
  } finally {
    connection.release();
  }
}
async function toggleTodoAsCompleted(todoid) {
  const connection = await pool.connect();
  try {
      const result = await connection.query(
        `UPDATE todos 
        SET completed_at = CASE 
            WHEN completed_at IS NULL THEN NOW() 
            ELSE NULL 
        END 
        WHERE id = $1 
        RETURNING *`,
        [todoid]
      );
      return result.rows[0];
  } finally {
    connection.release();
  }
}

async function editTodoContent(todoid, newContent) {
  const connection = await pool.connect();
  try {
    if (!newContent) {
      throw new Error("Content cannot be null");
    }
    const result = await connection.query(
      'UPDATE todos SET content = $1 WHERE id = $2 RETURNING *',
      [newContent, todoid]
    );
    return result.rows[0];
  } finally {
    connection.release();
  }
}

async function removeTodo(todoid) {
  const connection = await pool.connect();
  try {
    const result = await connection.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [todoid]
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