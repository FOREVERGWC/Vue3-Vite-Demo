/**
 * 后端消息返回对象
 */
export interface R<T> {
    /**
     * 响应状态码
     */
    code: number
    /**
     * 提示消息
     */
    msg: string
    /**
     * 响应体
     */
    data: T
}
