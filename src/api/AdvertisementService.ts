import request from "../assets/util/request";
import {DataTableRowKey} from "naive-ui";

/**
 * 接口地址
 */
enum Api {
    /**
     * 添加接口
     */
    add = '/api/advertisements',
    /**
     * 分页接口
     */
    page = '/api/advertisements',
    /**
     * 更新接口
     */
    update = '/api/advertisements',
    /**
     * 删除接口
     */
    delete = '/api/advertisements',
    /**
     * 批量删除
     */
    deleteBatch = '/api/advertisements/batch'
}

/**
 * 广告接口
 */
export class AdvertisementService {
    /**
     * 添加接口
     * @param data 请求参数
     */
    static async add(data: object) {
        return request.post<null>(Api.add, data)
    }

    /**
     * 更新接口
     * @param data 请求参数
     */
    static async update(data: object) {
        return request.put<null>(Api.update, data)
    }

    /**
     * 删除接口
     * @param id ID
     */
    static async delete(id: number) {
        return request.delete<null>(`${Api.delete}/${id}`)
    }

    /**
     * 批量删除
     * @param ids ID数组
     */
    static async deleteBatch(ids: Array<DataTableRowKey>) {
        return request.delete<null>(Api.deleteBatch, ids)
    }

    /**
     * 分页接口
     * @param current 当前页码
     * @param size 页面大小
     * @param data 查询条件
     */
    static async page(current: number, size: number, data: object) {
        return request.post<null>(`${Api.page}/${current}/${size}`, data)
    }
}
