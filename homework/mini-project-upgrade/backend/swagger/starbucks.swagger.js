/**
 * @openapi
 * /starbucks:
 *   get:
 *      summary: 커피메뉴 리스트 가져오기
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
 *	                                    example: 아메리카노
 *                                  img:
 *	                                    type: string
 *	                                    example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241...
 */                                