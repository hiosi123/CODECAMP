/**
 * @openapi
 * /tokens/phone:
 *   post:
 *      summary: 휴대폰 인증
 *      tags: [Post]
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
 *      responses:
 *          200:
 *              description: 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: number
 *                          example: 102313
 *                 
 * 
 */                         