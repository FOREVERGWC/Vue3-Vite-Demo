import axios from "axios";
import {R} from "../../types";

axios.defaults.timeout = 3000

axios.interceptors.request.use((config) => {
    return config
}, (error) => Promise.reject(error))

axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        const {response} = error
        if (response) {
            return Promise.reject(response.data)
        } else {
            console.log('网络异常！')
        }
    }
)
export default {
    get<T>(url: string, params?: object): Promise<R<T>> {
        return new Promise<R<T>>((resolve, reject) => {
            axios.get(url, params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    post<T>(url: string, data: object, config?: object): Promise<R<T>> {
        return new Promise<R<T>>((resolve, reject) => {
            axios.post(url, data, config).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    put<T>(url: string, data: object = {}): Promise<R<T>> {
        return new Promise<R<T>>((resolve, reject) => {
            axios.put(url, data).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    delete<T>(url: string, data?: object | Array<object>): Promise<R<T>> {
        return new Promise<R<T>>((resolve, reject) => {
            axios.delete(url, {data: data}).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
