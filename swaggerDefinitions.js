/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT 
 * 
 * /users:
 *   post:
 *     summary: 使用者註冊
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   nickname:
 *                     type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 * 
 * /users/sign_in:
 *   post:
 *     summary: 使用者登入
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       201:
 *         description: User login successfully
 *       400:
 *         description: Bad request
 * 
 * /todos:
 *   get:
 *     summary: 取得待辦
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           description: Bearer token for authorization.
 *           example: Bearer <JWT>
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 * 
 * 
 *   post:
 *     summary: 新增待辦
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: BearerToken
 *           description: Bearer token for authorization.
 *           example: Bearer <JWT>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 * 
 * /todos/complete/{todoId}:
 *   put:
 *     summary: toggle待辦完成狀態
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: BearerToken
 *           description: Bearer token for authorization.
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 * 
 * /todos/edit/{todoId}:
 *   put:
 *     summary: 編輯待辦內容
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: BearerToken
 *           description: Bearer token for authorization.
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: todo item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 * 
 * /todos/{todoId}:
 *   delete:
 *     summary: 刪除待辦
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: BearerToken
 *           description: Bearer token for authorization.
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: todo item id
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 * 
 */

module.exports = {};
