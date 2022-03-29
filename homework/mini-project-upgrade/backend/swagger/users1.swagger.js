/**
 * @openapi
 * /user:
 *   post:
 *      summary: 회원가입 하기
 *      tags: [Post]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  required: true
 *                                  example: 신홍석
 *                              email:
 *	                                type: string
 *	                                example: hiosi@naver.com
 *                              personal:
 *                                  type: string
 *                                  example: "999999-9999999"
 *                              prefer:
 *                                  type: string
 *                                  example: www.naver.com
 *                              pwd:
 *                                  type: string
 *                                  example: "123123"
 *                              phone:
 *                                  type: string
 *                                  example: "01020311883"
 *      responses:
 *          200:
 *              description: 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: _id
 *                          example: asd12dksajd12dsae12
 *                                  
 */                         