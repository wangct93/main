/**
 * Created by Administrator on 2018/3/7.
 */


export const loadData = type => {
    return {
        type:'get'+ type +'Data'
    }
};