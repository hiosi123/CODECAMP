/**
 * @openapi
 * /users:
 *   get:
 *      summary: 주문한 사람 정보 가져오기
 *      tags: [Get]
 *      responses:
 *          200:
 *              description: 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  name:
 *	                                    type: string
 *	                                    example: Simon
 *                                  email:
 *	                                    type: string
 *	                                    example: hiosi@naver.com
 *                                  personal:
 *                                      type: string
 *                                      example: 999999-9999999
 *                                  prefer:
 *                                      type: string
 *                                      example: www.google.com
 *                                  pwd:
 *                                      type: string
 *                                      example: 123123
 *                                  phone:
 *                                      type: string
 *                                      example: 01020311883
 *                                  og:
 *                                      type: object
 *                                      properties:
 *                                          title:
 *                                              type: string 
 *                                              example: 네이버 
 *                                          url:
 *                                              type: string
 *                                              example: https://www.naver.com/
 *                                          image:
 *                                              type: string
 *                                              example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241...
 *                                          description:
 *                                              type: string
 *                                              example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                          
 *                                                 
 *                                                  
 * 
 */                                