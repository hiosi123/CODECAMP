/**
 * @openapi
 * /tokens/phone:
 *   patch:
 *      summary: 문자로 받은 번호 인증하기
 *      tags: [Patch]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              phone:
 *                                  type: string
 *                                  example: "01020311883"
 *                              token:
 *                                  type: string
 *                                  example: 123123
 *      responses:
 *          200:
 *              description: 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: String
 *                          example: true
 *                 
 * 
 */                         